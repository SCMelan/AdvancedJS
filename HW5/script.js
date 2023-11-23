const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: false,
  },
  methods: {
    filterGoods() {
      this.goods.filter((good) => {
        const search = this.searchLine.toLowerCase();
        if (
          good.product_name.toLowerCase().includes(search) &&
          !this.filteredGoods.includes(good)
        ) {
          this.filteredGoods.push(good);
        }
      });
    },
    showCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
  computed: {},
  mounted() {
    fetch(`${API_URL}/catalogData.json`)
      .then((response) => response.json())
      .then((response) => {
        this.goods = response;
      });
  },
});
