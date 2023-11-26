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
