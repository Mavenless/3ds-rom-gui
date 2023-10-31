const url = "https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Decrypted)/";
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';

/*
    * Fetches the name of the file from the url
    * @return {Array} name2
    * @example
    * await fetchName();
*/
async function fetchName() {
    var name2 = [];
    await fetch(url)
        .then(response => response.text())
        .then(body => {
            body.match(/<a href="(.*)">/g).forEach((name) => {
                const name3 = name.toString().split('"');
                if(name3[3] != undefined && name3[3].endsWith('.zip')) {
                name2.push(name3[3]);
                }
            });
        });
    return name2;
}

/*
    * Fetches the link of the file from the url
    * @return {Array} link
    * @example
    * await fetchLink();
 */
async function fetchLink() {
    var link = [];
    await fetch(url)
        .then(response => response.text())
        .then(body => {
            body.match(/<a href="(.*)">/g).forEach((name) => {
                const name3 = name.toString().split('"');
                if(name3[1] != undefined && name3[1].endsWith('.zip')) {
                    link.push(name3[1]);
                }
            });
        });
    return link;
}

async function getGameByName(name, list) {
    var game = [];
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    for(var i = 0; i < list.length; i++) {
        if(list[i].toLowerCase().includes(name)) {
            game.push(list[i]);
        }
    }
    return game;
}

async function installGame(name, directory) {
    const link = url + name.replaceAll("% ", "%25 ").replaceAll(" ", '%20');
    const file = fs.createWriteStream(directory + "/" + name.replace(/%20/g, ' '));
    console.log(link)
    https.get(link, (res) => {
        res.pipe(file);
        file.on("finish", () => {
            file.close(sendNotification(name.replace(/%20/g, ' ')));
        });
    }); 
}

function sendNotification(name) {
    fetch("http://localhost:3000/sendNotification" + "?name=" + name)
    // new Notification("Download complete", { body: "The game has been downloaded" });
}
// ToDo: virer les récurrences, mais j'ai la flemme, là.
export { fetchName, fetchLink, getGameByName, installGame, url };

