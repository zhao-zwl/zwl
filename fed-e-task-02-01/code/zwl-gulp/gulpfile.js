// 实现这个项目的构建任务
const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const del = require('del');
const GulpSSH = require('gulp-ssh')
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()


const destSrc = 'dist/';
const temp = '.temp/';


const {
  APP_ENV,
  npm_package_name
} = process.env;
const isProduct = APP_ENV === 'production';

const remotePath = `/home/public/docker/main/${npm_package_name}`
const config = {
  ssh: { // 正式
    host: isProduct ? '' : '192.168.31.227',
    port: isProduct ? 22 : 8822,
    username: 'root',
    password: isProduct ? '' : 'a1234567',
  },
  remotePath,
  commands: [
    // 删除现有文件
    `rm -rf ${remotePath}`,
  ],
}
const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config.ssh,
  })

const data = {
  menus: [{
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [{
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

//清除
const clean = () => {
  return del([destSrc, temp, 'logs'])
}

//处理样式
const style = () => {
  return src('src/assets/styles/*.scss', {
      base: 'src'
    })
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(dest(temp))
    .pipe(bs.reload({
      stream: true
    }))
}
//处理脚本
const script = () => {
  return src('src/assets/scripts/*.js', {
      base: 'src'
    })
    .pipe(plugins.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest(temp))
    .pipe(bs.reload({
      stream: true
    }))
}
//处理页面
const page = () => {
  return src('src/*.html', {
      base: 'src'
    })
    .pipe(plugins.swig({
      data,
      defaults: {
        cache: false
      }
    })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest(temp))
    .pipe(bs.reload({
      stream: true
    }))
}
//压缩图片
const image = () => {
  return src('src/assets/images/**', {
      base: 'src'
    })
    .pipe(plugins.imagemin())
    .pipe(dest(destSrc))
}
//处理字体文件
const font = () => {
  return src('src/assets/fonts/**', {
      base: 'src'
    })
    .pipe(plugins.imagemin())
    .pipe(dest(destSrc))
}

const extra = () => {
  return src('public/**', {
      base: 'public'
    })
    .pipe(dest(destSrc))
}


const lint = () => {
  return src('src/assets/scripts/*.js')
    // eslint（）将lint输出附加到“eslint”属性 以供其它模块使用
    .pipe(plugins.eslint({
      rules: {
        'my-custom-rule': 1,
        'strict': 2
      },
      globals: [
        'jQuery',
        '$'
      ],
      envs: [
        'browser'
      ]
    }))
    // format（）将lint结果输出到控制台。
    // 或者使用eslint.formatEach（）（参见文档）。
    .pipe(plugins.eslint.format())
    // 使进程退出时具有错误代码（1）
    // lint错误，最后将流和管道返回failAfterError。
    .pipe(plugins.eslint.failAfterError());
}


const execSSH = () => {
  return gulpSSH.shell(config.commands, {
      filePath: 'commands.log'
    })
    .pipe(dest('logs'))
}

const deploy = () => {
  return src(`./${destSrc}/**`)
    .pipe(gulpSSH.dest(config.remotePath))
}


const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    // files: 'dist/**',
    server: {
      baseDir: [temp, 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src(`${temp}*.html`, {
      base: temp
    })
    .pipe(plugins.useref({
      searchPath: [temp, '.']
    }))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(destSrc))
}

const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const start = series(compile, serve)
module.exports = {
//   style,
//   script,
//   page,
//   image,
//   font,
  clean,
  serve,
  build,
  start,
  lint,
  deploy
}
