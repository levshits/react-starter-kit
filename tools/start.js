import Browsersync from 'browser-sync';
import run from './run';
import build from './build';
import gaze from 'gaze';

async function start() {
    const bs = Browsersync.create();
    bs.init();
    await run(build);

    const watcher = await new Promise((resolve, reject) => {
        gaze('src/**/*.*', (err, val) => err ? reject(err) : resolve(val));
    });
    watcher.on('changed', async () => {
        await run(build);
        bs.reload();
    });
}


export default start;