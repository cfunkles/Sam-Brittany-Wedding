let noSleep = new NoSleep();

const initiateButton = document.getElementById('initiate');
initiateButton.onclick = function() {
    initiateButton.style.display = "none";
    document.body.innerHTML += "<p>Thanks for Joining Our Wedding</p>"
};
//  TODO make this agnostic to the machine's configured IP
const url = 'ws://10.0.186:8082/password';
var player = new JSMpeg.Player(url, {maxAuidoLag:1, disableGl:true, audio:true, audioBufferSize:400*1024});

function onUnlocked () {
    // console.log('unlock video audio: ' + url)
    player.volume = 1
    document.removeEventListener('touchstart', onTouchStart)
}
function onTouchStart () {
    noSleep.enable(); // keep the screen on!
    player.audioOut.unlock(onUnlocked)
    document.removeEventListener('touchstart', onTouchStart)
}
// try to unlock immediately
noSleep.enable(); // keep the screen on!
player.audioOut.unlock(onUnlocked)
// try to unlock by touchstart event
document.addEventListener('touchstart', onTouchStart, false)