const express = require('express');
const http = require('http');
const shortid = require('shortid');

const main = require('./main');

const app = express();
const port = process.env.PORT || 4000;

var numberOfVisits = 0;

app.use(express.json({
    extended: false
}));

app.use(express.urlencoded({
    extended: false
}));

http.createServer(app).listen(4000, function () { });
console.log("SERVER STARTED AT PORT " + port);

app.post('/shorten', async (req, res) => {
    const longUrl = req.body.longUrl;
    const baseUrl = "http://" + req.headers.host;
    const urlCode = shortid.generate();
    const shortUrl = baseUrl + '/' + urlCode;
    const urlBody = {
        longUrl,
        baseUrl,
        urlCode,
        shortUrl
    }
    console.log(urlBody);

    await main.shortenUrl(urlBody, (response) => {
        res.send(response);
    });
});

app.get('/:urlCode', async (req, res) => {
    var urlCode = req.params.urlCode;

    await main.getLongUrl(urlCode, (response) => {
        res.send(response);
    })
})