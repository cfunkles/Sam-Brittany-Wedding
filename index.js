// var fs = require('fs');
let { exec } = require('child_process');
var express = require('express');
var app = express();

// Path for using an html audio tag
// app.get('/audio', function(req, res) {
//     const path = 'public/Muzaktica.mp3'
//     const stat = fs.statSync(path)
//     const fileSize = stat.size
//     const range = req.headers.range
//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-")
//       const start = parseInt(parts[0], 10)
//       const end = parts[1] 
//         ? parseInt(parts[1], 10)
//         : fileSize-1
//       const chunksize = (end-start)+1
//       const file = fs.createReadStream(path, {start, end})
//       const head = {
//         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunksize,
//         'Content-Type': 'audio/mpeg',
//       }
//       res.writeHead(206, head);
//       file.pipe(res);
//     } else {
//       const head = {
//         'Content-Length': fileSize,
//         'Content-Type': 'audio/mpeg',
//       }
//       res.writeHead(200, head)
//       fs.createReadStream(path).pipe(res)
//     }
// });

app.get('/streamSong/:song', function(req, res) {
    let song = req.params.song;
    let cmd = `ffmpeg -re -i ./public/audio/${song}.mp3 -r 10 -vcodec mpeg3 -f mpegts http://localhost:8081/password`;
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            // TODO show the std out when song is streaming
            // console.log({ stdout, stderr });
        }
    });
    res.send('Playing Song');
});

app.use(express.static('public'));

// 404 File Not Found
app.use(function(req, res, next) {
    res.status(404);
    res.send("404 File not Found");
});

// 500 Server Error Handler
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500);
    res.send("500 Internal Server Error");
});

app.listen(8080, function() {
    console.log('Server Started http://localhost:8080 Lets start a wedding :)');
});