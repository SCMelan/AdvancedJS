const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component("goods-list", {
  props: ["goods"],
  template: `
      <div class="goods-list">
        <goods-item @addtocart="addToCart" v-for="good in goods" :good="good"></goods-item>
      </div>
    `,
  methods: {
    addToCart(item) {
      this.$emit("addtocart", item);
    },
  },
});

Vue.component("goods-item", {
  props: ["good"],
  template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button v-on:click="addToCart(good)" class="buy-button" type="button">Добавить товар</button>
      </div>
    `,
  methods: {
    addToCart(item) {
      this.$emit("addtocart", item);
    },
  },
});

Vue.component("search", {
  template: `
  <div>
    <input v-model="inputValue" type="text" class="goods-search" />
    <button  v-on:click="filterGoods(inputValue)" class="search-button" type="button">Искать</button>
  </div>
`,
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    filterGoods(value) {
      this.$emit("filtergoods", value);
    },
  },
});

Vue.component("cart", {
  props: ["cartItems"],
  template: `
  <div class="cart">
    <h2>Корзина</h2>
    <p v-if="!cartItems.length">Корзина пуста</p>
    <div v-for="item in cartItems" :key="item.title" class="cart-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button v-on:click="removeFromCart(item)"  type="button">Убрать товар</button>
    </div>
  </div>
`,
  methods: {
    removeFromCart(item) {
      this.$emit("remove-from-cart", item);
    },
  },
});

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
