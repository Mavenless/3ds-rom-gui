// ToDo: check if node.js is installed on the system, if not, show error message and exit. (doesn't work yet cause of execCommand)

const localhost = 'http://localhost:3000/';

async function showGames(games = null) {
    if(games == null) games = gamess.result;
    let gameList = "";

    for (const game of games) { 
        gameList += `<div class="btn-download my-3 mx-auto card w-96 shadow-xl bg-slate-950 hover:bg-slate-800 transition ease-in">
        <div class="card-body">
          <h1 class="text-center text-2xl">${game}</h2>
            <button class="btn btn-primary btn-download">Download</button>
        </div>
      </div>\n`;

    }
    console.log(document.getElementById('games').innerHTML = `
    ${gameList}
    `);
    const downloadBtn = document.getElementsByClassName('btn-download');
    Array.from(downloadBtn).forEach(btns => {

        btns.addEventListener("click", async (name) => {
            // download link
            btns.classList.toggle('downloaded');
            let directory = JSON.parse(config).directory;
            const game = name.srcElement.getAttribute('value');
            
            if(directory == null) {
                do {
                    directory = await Neutralino.os.showFolderDialog("Select a directory", { defaultPath: await Neutralino.os.getPath("documents") });
                    await Neutralino.storage.setData('userDetails', JSON.stringify({ directory: directory}));
                } while(directory == null || directory == "");
                config = await Neutralino.storage.getData('userDetails');
            }
    
            await fetch(localhost + 'installGame?name=' + game + '&directory=' + directory);
            await Neutralino.os.showNotification(`3DS`, "Downloading... Please wait", "INFO"); // Neutralino OS notification doesn't work (yet)
        });
    });
} 

document.getElementById('search').addEventListener("input", async (name) => {
    const games = await fetch(localhost + 'getGameByName?name=' + name.target.value).then(response => response.json());
    await showGames(games.result);
});

async function onWindowClose() {
    await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'exit').catch(async err =>  {
        await Neutralino.os.showMessageBox("Error", `${err.message}`);    
    });
    Neutralino.app.exit();   
}

Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);

/* async function nodeInstalled() {

    new Promise((resolve, reject) => {
        setTimeout(async () => {
            let nodeinst = await Neutralino.os.execCommand('node -v');
            resolve(nodeinst);
            }, 1000);
    }).then(async (nodeinst) => {
        console.log(nodeinst)
        if(nodeinst.exitCode != 0) {
            await Neutralino.os.showMessageBox("Error", "Node.js is not installed on your system. Please install it first.");
            Neutralino.app.exit();
        }
    });
}

await nodeInstalled(); */

let nodeProc = await Neutralino.os.spawnProcess('node server.js', NL_PATH + "/.tmp/");
await Neutralino.storage.setData('userDetails', JSON.stringify({ directory: null}));
let config = await Neutralino.storage.getData('userDetails');

Neutralino.events.on('spawnedProcess', (evt) => {
    if(nodeProc.id == evt.detail.id) {
        switch(evt.detail.action) {
            case 'stdOut':
                console.log(evt.detail.data);
                if(evt.detail.data == "finished\n") {
                    Neutralino.os.showNotification(`3DS ROM`, "Download complete", "INFO"); // Neutralino OS notification doesn't work (yet)
                }
                break;
            case 'stdErr':
                console.error(evt.detail.data);
                break;
            case 'exit':
                console.log(`Node.js process terminated with exit code: ${evt.detail.data}`);
                break;
        }
    }
});

const gamess = await fetch(localhost + 'getGames').then(response => response.json());
await showGames();