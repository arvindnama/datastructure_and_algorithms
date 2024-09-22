/**
 * A sample that demonstrates Abort controller.
 */

import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <styles>
            .download[disabled],
            .cancel-download[disabled] {
               cursor: none
            }
            .download,
            .cancel-download {
               cursor: pointer
            }
        </styles>
        <body>
            <button class = ".download">Download video </button>
            <button class = ".cancel-download">cancel </button>
        </body>
    </html>
`);

function main() {
    const dwnBtn = dom.window.document.querySelector('.download');
    const canceldwnBtn = dom.window.document.querySelector('.cancel-download');
    const abortController = new AbortController();
    (canceldwnBtn as any).disabled = true;
    dwnBtn?.addEventListener('click', async () => {
        (canceldwnBtn as any).disabled = false;
        (dwnBtn as any).disabled = true;

        try {
            await fetch('url_to_download_video', {
                signal: abortController.signal,
            });
            console.log('download completed');
        } catch (e) {
            console.log('download aborted');
        } finally {
            (canceldwnBtn as any).disabled = true;
            (dwnBtn as any).disabled = false;
        }
    });

    canceldwnBtn?.addEventListener('click', async () => {
        abortController.abort();
    });
}

dom.window.addEventListener('DOMContentLoaded', () => main());
