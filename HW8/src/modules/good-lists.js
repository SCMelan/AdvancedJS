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
