<template>
  <div class="paginacao">
    <button v-for="page in pages" :key="page" @click="changePage(index)">
      {{page}}
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
      totalPaises: {
        type: [String, Number],
        required: true,
      },
      paisesPorPagina: {
        type: [String, Number],
        default: 12,
      },
    },
    computed: {
      current() {
        return this.offset ? this.offset + 1 : 1;
      },
      pages() {
        const qty = Math.ceil(this.totalPaises / this.paisesPorPagina);
        if (qty <= 1) return [1];
        return Array.from(Array(qty).keys(), (i) => i + 1);
      },
  },
  methods: {
    changePage(offset) {
      this.$emit('change-page', offset);
    },
  },
};
</script>

<style scoped>

.paginacao {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
}

.paginacao button {
  background: none;
  padding: 0.875rem;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  font-family: var(--font-primary);
  color: var(--secondary-color);
  cursor: pointer;
  margin: 0 0.3rem;
  transition: .3s;
}

.paginacao button:hover {
  background: var(--primary-color);
  color: white;
}

@media (max-width: 640px) {
  .paginacao {
    flex-wrap: wrap;
  }
  .paginacao button {
    margin: 0.4rem;
  }
}

</style>