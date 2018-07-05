// Streaming CODE and onUnlock CODE from https://github.com/phoboslab/jsmpeg
// noSleep CODE from NoSleep.js https://github.com/richtr/NoSleep.js?utm_source=recordnotfound.com

let noSleep = new NoSleep();

const initiateButton = document.getElementById('initiate');
initiateButton.onclick = function() {
    initiateButton.style.display = "none";
    let afterTouchElem = document.getElementsByClassName("afterTouch");
    let paragraphElement = document.createElement('p');
    paragraphElement.textContent = 'YOU HAVE NOW JOINED THE WEDDING STREAM';
    afterTouchElem[0].innerHTML = paragraphElement.innerHTML;
};
const ip = location.hostname;
const url = `ws://${ip}:8082/password`;
console.log(url);
var player = new JSMpeg.Player(url, {maxAuidoLag:1, disableGl:true, audio:true,video:false, audioBufferSize:512*128});

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