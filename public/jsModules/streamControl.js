// TODO cancel other song stream when starting new song
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
        // Update the IP based on device running accessing this file
        xmlHttp.open("GET", 'http://10.0.0.186:8080/streamSong/' + songName, true); // true for asynchronous 
        xmlHttp.send(null);
    }
});