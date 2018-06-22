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
//  TODO make this agnostic to the machine's configured IP
const url = 'ws://10.0.186:8082/password';
var player = new JSMpeg.Player(url, {maxAuidoLag:1, disableGl:true, audio:true, audioBufferSize:400*1024});

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