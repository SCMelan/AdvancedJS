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
