<template>
  <ul class="pagination__list">
    <li v-for="(currentPageNo, index) in pageNumbers" :key="index">
      <button @click="paginate(currentPageNo)" class="button--pokedex">{{currentPageNo}}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    cardsPerPageProp: {
      type: Number,
      required: true,
    },
    totalCardsProp: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pageNumbers() {
      const pageNumbers = [];
      let pageNumLimit = Math.ceil(this.totalCardsProp / this.cardsPerPageProp);
      for (let i = 1; i <= pageNumLimit; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
  },
  methods: {
    paginate(pageNumber) {
      this.$emit("paginate-evt", pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__list {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      margin-right: 1.5rem;

      button {
        cursor: pointer;
        border: none;
      }
    }
  }
}
</style>