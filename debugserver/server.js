const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

// Specify file path relative to current directory
const filepath = '/../morse'

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
