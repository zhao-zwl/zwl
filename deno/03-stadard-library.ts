//标准库
import {ensureDir} from 'https://deno.land/std/fs/mod.ts'
//mkdir
await ensureDir('./foo/bar/baz')
//执行：deno run --unstable --allow-read --allow-write 03-stadard-library.ts
