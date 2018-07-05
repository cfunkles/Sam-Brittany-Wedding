// var fs = require('fs');
let { spawn } = require('child_process');
let process;
var express = require('express');
var app = express();

app.get('/streamSong/:song', function(req, res) {
    let song = req.params.song;
    if (song === "killStream") {
        if (process) {
            process.kill('SIGINT');
            process = null;
            console.log('Killing Stream');
            return res.send('Stream Killed');
        }
        console.log('No Stream initiated');
        return res.send('Nothing to Kill');
    }
    if (process) {
        process.kill('SIGINT');
        console.log('Stopping stream, Starting new stream');
    }
    let cmd = 'ffmpeg';
    let args = [
        '-re',
        '-i', `./public/audio/${song}.mp3`,
        '-f', 'mpegts',
        'http://localhost:8081/password'
    ];

    // Run the child process to play the song
    process = spawn(cmd, args);
    // Log the out put
    process.stdout.on('data',(data) => {
        console.log(data);
    });
    // log the error
    process.stderr.on('data', (data) => {
        console.log(data);
    });
    // Log when finished
    process.on('close', () => {
        console.log('finished');
    });
    res.send('Playing Song');
});

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