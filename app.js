const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tamalesDB', {
  useNewUrlParser: true,
});

const app = express();

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  verdes: Number,
  rajas: Number,
  mole: Number,
  champurrado: Number,
  comment: String,
});

const Item = mongoose.model('Item', itemSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(__dirname + '/images'));

app.get('/', function (request, response) {
  console.log('hey');
  response.sendFile(__dirname + '/index.html');
});

app.get('/customers', function (request, response) {
  Item.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      response.render('customers', { doresultsStorage: items });
    }
  });
});

app.post('/customers', function (request, response) {
  const item = new Item({
    name: request.body.name,
    verdes: request.body.verdes,
    rajas: request.body.rajas,
    mole: request.body.mole,
    champurrado: request.body.champurrado,
    comment: request.body.comment,
  });
  item.save();
  response.redirect('/');
});

app.post('/delete', function (req, res) {
  const checkedItemId = req.body.butt;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log('Item Deleted');
      res.redirect('/customers');
    }
  });
});

app.listen(3000, function () {
  console.log('server started on port 3000');
});
