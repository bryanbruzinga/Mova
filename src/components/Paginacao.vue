<template>
  <ul class="paginacao">
    <li v-for="page in pages" :key="page">
      <router-link :to="{query: {_page: pagina}}">
        {{page}}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
    name: "paginacao",
    props: {
      totalPaises: {
        type: Number,
        required: true,
      },
      paisesPorPagina: {
        type: Number,
        default: 12,
      }
    },
    methods: {
      query(pagina) {
        return {
          ...this.$route.query,
          _page: pagina
        }
      }
    },
    computed: {
      paginas() {
        const current = Number(this.$route.query._page);
        const range = 12;
        const offset = Math.ceil(range/2);
        const total = this.paginasTotal;
        const pagesArray = [];

        for (let i = 1; i <= total; i++) {
          pagesArray.push(i)
        }
        pagesArray.splice(0, current - offset);
        pagesArray.splice(range, total);
        return pagesArray;
      },
      paginasTotal() {
        const total = this.totalPaises / this.paisesPorPagina;
        return (total !== Infinity) ? Math.ceil(total) : 0;
      }
    },
}
</script>

<style scoped>

.paginacao {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
}

.paginacao li {
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

.paginacao li:hover {
  background: var(--primary-color);
  color: white;
}

@media (max-width: 640px) {
  .paginacao {
    flex-wrap: wrap;
  }
  .paginacao li {
    margin: 0.4rem;
  }
}

</style>