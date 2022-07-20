const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var srcfilesdir;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Enter Directory: `, server_loc => {

    // Specify file path relative to current directory
    const filepath = `/../${server_loc}`

    try {
        app.use(express.static(path.join(__dirname + filepath)))
        router.get('/', (req, res) => {
            res.sendFile('/index.html')
        });
        app.use('/', router);
        app.listen(process.env.PORT || 3000, ()=>{
            console.log(`app is running on port 3000`)
        });
    } catch(err) {
        console.log("this is a server error:", err)
    }

    readline.close();
});
