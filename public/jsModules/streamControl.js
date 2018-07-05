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
        xmlHttp.open("GET", '/streamSong/' + songName, true); // true for asynchronous 
        xmlHttp.send(null);
    }
});