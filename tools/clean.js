/**
 * Created by LevshitsVV on 05.08.2016.
 */
import del from 'del';
import fs from './lib/fs';


async function clean(){
    await del(['.tmp', 'build/*'], {dot: true});
    await fs.makeDir('build/public');
}

export default clean;
