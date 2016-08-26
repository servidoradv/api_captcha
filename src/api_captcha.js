var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();

var conf = {
  urlApiGoogle: 'https://www.google.com/recaptcha/api/siteverify',
  keys: {
    site: '6LdSTygTAAAAALEzXeCN6vF4oMavQtw-lq-1kQLY',
    direitoDosConcursos: '6LeJYCgTAAAAAP403Hs01WdG8At9XUogFqubs4tC',
    blogServidorLegal: '6LeKYCgTAAAAAJYuq3h9WsUMsG3Xbf7wrCbIxszE',
    portfolio: '6LdvbigTAAAAACpmfBgo0kENgCdI-OFUSN2T7Fka'
  }
};

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function requestToGoogle(key, req, callback) {
  request.post({
    url: conf.urlApiGoogle,
    form: {
      secret: key,
      response: req.body.responseHash
    }
  },
    function (err, httpResponse, body) {
      var bodyResponse = JSON.parse(body);
      return callback(bodyResponse.success);
    });
}

app.post('/validacao-captcha/site', function (req, res) {
  requestToGoogle(conf.keys.site, req, function (result) {
    res.send(result);
  });
});

app.post('/validacao-captcha/direito-dos-concursos', function (req, res) {
  requestToGoogle(conf.keys.direitoDosConcursos, req, function (result) {
    res.send(result);
  });
});

app.post('/validacao-captcha/blog-servidor-legal', function (req, res) {
  requestToGoogle(conf.keys.blogServidorLegal, req, function (result) {
    res.send(result);
  });
});

app.post('/validacao-captcha/portfolio', function (req, res) {
  requestToGoogle(conf.keys.portfolio, req, function (result) {
    res.send(result);
  });
});

app.listen(8050);

