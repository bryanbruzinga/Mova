<template>
  <div class="paginacao">
    <button v-for="(page, index) in pages" :key="page" class="item" :class="{current: pages === current }" @click="changePage(index)">
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
    name: "paginacao",
    props: {
      offset: {
        type: [String, Number],
        default: 0,
      },
      total: {
        type: [String, Number],
        required: true,
      },
      limit: {
        type: [String, Number],
        default: 12,
      }
    },
    computed: {
      current() {
        return this.offset ? this.offset + 1 : 1;
      },
      pages() {
        const qty = Math.ceil(this.total / this.limit);
        if (qty <= 1) return [1];
        return Array.from(Array(qty).keys(), (i) => i + 1);
      },
    },
    methods: {
      changePage(offset) {
        this.$emit('change-page', offset)
      }
    }
}
</script>

<style>

</style>