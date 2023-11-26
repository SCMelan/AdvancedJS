const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

app.use(express.static("."));

app.listen(3000, function () {
  console.log("server is running on port 3000!");
});

app.get("/catalogData", (req, res) => {
  fs.readFile("catalog.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/cartData", (req, res) => {
  fs.readFile("cart.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf8", (err, data) => {
    let id = 1;

    const cart = JSON.parse(data);

    if (cart.length > 0) {
      id = cart[cart.length - 1].id_product + 1;
    }

    const item = req.body;

    item.id_product = id;

    cart.push(item);

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });
  });
});

app.post("/removeFromCart", (req, res) => {
  fs.readFile("cart.json", "utf8", (err, data) => {
    let cart = JSON.parse(data);
    let item = req.body;

    const itemId = item.id_product;
    const index = cart.findIndex((item) => item.id_product === itemId);

    console.log(item, " iterm");

    if (index >= 0) {
      cart = [...cart.slice(0, index), ...cart.slice(index + 1)];
    }

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });
  });
});
