const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".goods-search");
searchButton.addEventListener("click", (e) => {
  const value = searchInput.value;
  list.filterGoods(value);
});

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }

  filterGoods(value) {
    const regexp = new RegExp(value, "i");
    this.filteredGoods = this.goods.filter((good) =>
      regexp.test(good.product_name)
    );
    this.render();
  }

  render() {
    let listHtml = "";
    this.filteredGoods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  calcTotalPrice() {
    let summ;
    this.goods.forEach((item) => (summ += item.price));
    return summ;
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`)
      .then((response) => {
        this.goods = JSON.parse(response);
        this.filteredGoods = JSON.parse(response);
      })
      .then(() => {
        cb();
      });
  }
}

class Cart {
  constructor() {
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }

  remove(item) {
    const indexForDelete = this.items.indexOf(item);
    this.items.splice(indexForDelete, 1);
  }
  removeAll() {
    // this.items.length = 0
    this.items.splice(0, this.items.length);
  }
  calcTotalPrice() {
    let summ;
    this.items.forEach((item) => (summ += item.price));
    return summ;
  }
}

class itemCart {
  constructor(title, price, qty) {
    this.title = title;
    this.price = price;
    this.qty = qty;
  }

  incrQty(item) {
    if (item.qty >= 1) {
      item.qty += 1;
    } else {
      return "Невозможно добавить не существующий товар";
    }
  }
  decrQty(item) {
    if (item.qty > 1) {
      item.qty -= 1;
    } else if (item.qty === 0) {
      const agreement = confirm("Вы точно хотите удалить товар?");
    } else {
      return "Невозможно уменьшить кол-во товара";
    }
  }
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

function makeGETRequest(url, callback) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}

//Задание 1
// const regexp = new RegExp(/'/, "g");

const regexp = new RegExp(/(\s((.+)'(.+))\s)\s/, "g");
const text = `Lorem ' ipsu'm dolor sit amet consectetur adipisicing elit. 'Optio perferendis quis vero officia eaque'`;
console.log(text.replace(regexp, '"'));
