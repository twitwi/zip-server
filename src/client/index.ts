const loadButton = document.querySelector<HTMLButtonElement>('#load');
const urlInput = document.querySelector<HTMLInputElement>('#zipUrl');
loadButton.disabled = true;

const workerURL = './worker.js';
navigator.serviceWorker.register(workerURL)
    .then(() => console.log('Installing...'))
    .catch(error => console.log('Error while installing service worker:', error));


navigator.serviceWorker.ready.then(() => {
    let broadcast: BroadcastChannel;

    const go = (urlAndPath) => {
        const [url, path] = (urlAndPath+'###').split('###');
        const id = crypto.randomUUID();
        broadcast?.close();
        broadcast = new BroadcastChannel(id);
        broadcast.onmessage = async (message) => {
            switch (message.data.type) {
                case 'LOADED':
                    console.log('got message: LOADED');
                    const response = await fetch(`./${id}/data/b41a6b6af21edf559e0f5a473b5ca6f5447b1d7e.zip`);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    console.log('Link to zip:', url)

                    document.location.href = `./${id}/${path}`;
                    // const iframe = document.createElement('iframe');
                    // iframe.src = `/${id}/`;
                    // let iframeContainer = document.querySelector('#iframe-container');
                    // iframeContainer.innerHTML = '';
                    // iframeContainer.appendChild(iframe);
            }
        }

        navigator.serviceWorker.controller.postMessage({
            type: 'LOAD',
            id: id,
            url: url,
        });
    };
    
    if (window.location.hash) {
        let url = window.location.hash.substr(1);
        if (url.startsWith('cors://')) {
            url = 'https://'+url.substring(0, 4)+'.heeere.'+'com'+'/https://'+url.substring(7);
        }
        go(url);
    }

    loadButton.onclick = () => {
        go(urlInput.value);
    };
    loadButton.disabled = false;
});
