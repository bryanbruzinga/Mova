<template>
  <div class="paginacao">
    <button @click="anterior">Voltar</button>
    <div v-for="(pagina, index) in totalPaginas" :key="index">
      <button>{{pagina}}</button>
    </div>
    <button @click="proximo">Próximo</button>
  </div>
</template>

<script>
export default {
    name: "paginacao",
    props: ['paisesFiltrados', 'postsPorPagina', 'paginaAtual'],
    computed: {
      totalPaginas() {
        return Math.ceil(this.paisesFiltrados.length / this.postsPorPagina)
      }
    },   
  methods: {
    proximo() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++
      }
    },
    anterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--
      }
    }
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