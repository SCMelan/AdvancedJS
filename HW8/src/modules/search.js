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
