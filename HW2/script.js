class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  calcTotalPrice() {
    let summ;
    this.goods.forEach((item) => (summ += item.price));
    return summ;
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
list.fetchGoods();
list.render();
