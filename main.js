const MongoClient = require('mongodb').MongoClient;
const validUrl = require('valid-url');
const url = 'mongodb://localhost:27017/mydb';

var numberOfVisits = 0;

function shortenUrl(urlBody, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {

        if (err) {
            return new Error('failed to connect to Mongodb Server');
        }

        var db = client.db('mydb');

        if (!validUrl.isUri(urlBody.baseUrl)) {
            res.json('Invalid base url');
        }

        if (validUrl.isUri(urlBody.longUrl)) {
            try {
                db.collection('URL').insertOne(urlBody);
                callback(urlBody);
            } catch (err) {
                res.send("Server error");
            }
        }
        client.close();
    });
}

function getLongUrl(urlCode, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            return new Error('failed to connect to Mongodb Server');
        }

        var db = client.db('mydb');

        numberOfVisits++;
        db.collection('URL').findOne({ urlCode: urlCode }, (err, result) => {
            if (err) {
                throw err;
            }
            callback({ longUrl: result.longUrl, numberOfVisits: numberOfVisits });
        });

        client.close();
    });

}

exports.shortenUrl = shortenUrl;
exports.getLongUrl = getLongUrl;