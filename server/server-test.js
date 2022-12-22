const express = require('express');

const app = express();

const ports = process.env.PORT || 3000; // if port is not defined listen on 3000

app.get('/', (req, res) => {
    res.send("Hello!");
})

app.listen(ports , () => console.log(`listening on ${ports}`));