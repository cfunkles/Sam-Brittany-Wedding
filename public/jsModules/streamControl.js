// Streaming CODE and onUnlock CODE from https://github.com/phoboslab/jsmpeg
// noSleep CODE from NoSleep.js https://github.com/richtr/NoSleep.js?utm_source=recordnotfound.com

let noSleep = new NoSleep();

const ip = location.hostname;
const url = `ws://${ip}:8082/password`;
console.log(url);
var player = new JSMpeg.Player(url, {throttled: false, pauseWhenHidden: false, maxAuidoLag:1, audio:true, video:false, audioBufferSize:256*1024});

function onUnlocked () {
    // console.log('unlock video audio: ' + url)
    player.volume = 1;
    document.removeEventListener('touchstart', onTouchStart);
}
function onTouchStart () {
    noSleep.enable(); // keep the screen on!
    player.audioOut.unlock(onUnlocked);
    document.removeEventListener('touchstart', onTouchStart);
}
// try to unlock immediately
noSleep.enable(); // keep the screen on!
player.audioOut.unlock(onUnlocked);
// try to unlock by touchstart event
document.addEventListener('touchstart', onTouchStart, false);


const songButtons = document.getElementsByClassName('playSong');
console.log(songButtons);
Array.from(songButtons).forEach(element => {
    const songName = element.getAttribute('name');
    element.addEventListener('click',playShape);
    function playShape() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                alert(xmlHttp.responseText);
                console.log(xmlHttp.responseText);
            }
        };
        xmlHttp.open("GET", '/streamSong/' + songName, true); // true for asynchronous 
        xmlHttp.send(null);
    }
});