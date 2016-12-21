var express = require('express');
var router = express.Router();
var app = express();
app.use(require('body-parser')());

var tours = [
  { id: 0, name: 'Hood River', price: 99.99 },
  { id: 1, name: 'Oregon Coast', price: 149.95 },
];

router.post('/',function (req,res) {
    console.log(req.xhr)    //如果是ajax,返回true
    console.log(req.body)
    res.json(tours);
    res.redirect(303,'/')
})

module.exports = router;
