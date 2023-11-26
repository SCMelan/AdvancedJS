const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cartItems: [],
    isVisibleCart: false,
  },
  methods: {
    filterGoods(value) {
      this.goods.filter((good) => {
        const search = value.toLowerCase();
        if (
          good.product_name.toLowerCase().includes(search) &&
          !this.filteredGoods.includes(good)
        ) {
          this.filteredGoods.push(good);
        }
      });
    },

    makePOSTRequest(url, data, callback) {
      let xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      };
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(data);
    },

    showCart() {
      this.getCartData();
      this.isVisibleCart = !this.isVisibleCart;
    },
    removeFromCart(item) {
      fetch("/removeFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(item),
      });
    },

    addToCart(item) {
      fetch("/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(item),
      });
    },

    getCartData() {
      fetch(`/cart.json`)
        .then((response) => response.json())
        .then((data) => {
          this.cartItems = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    makeGETRequest() {
      fetch(`/catalog.json`)
        .then((response) => response.json())
        .then((data) => {
          this.goods = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {},
  mounted() {
    this.makeGETRequest(``, (goods) => {
      this.goods = JSON.parse(goods);
    });
  },
});
