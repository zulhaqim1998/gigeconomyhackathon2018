const request = require("request");

request
    .get("http:localhost:3000")
    .end(function(err, res) {
        alert(res);
    });