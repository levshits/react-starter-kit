import path from 'path';
import gaze from 'gaze';
import Promise from 'bluebird'


async function copy({watch} = {}){
    const ncp = Promise.promisify(require('ncp'));

    await Promise.all([
        ncp('src/public', 'build/public'),
        ncp('src/content', 'build/content')
    ]);

    if (watch) {
        const watcher = await new Promise((resolve, reject) => {
            gaze('src/content/**/*.*', (err, val) => err ? reject(err) : resolve(val));
        });
        watcher.on('changed', async (file) => {
            const relPath = file.substr(path.join(__dirname, '../src/content/').length);
            await ncp(`src/content/${relPath}`, `build/content/${relPath}`);
        });
    }
}

export default copy;
