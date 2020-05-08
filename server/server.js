var express = require('express');
var cors = require('cors');

var app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())

app.get('/', function (req, res) {
    res.send("Server is working correctly");
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8888;
}
console.log('Listening on ' + port);
app.listen(process.env.PORT || 8888, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
