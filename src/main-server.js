const http = require('http');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.send("Hello, world");
});
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});