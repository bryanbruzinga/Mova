<template>
  <section>
    <div v-if="loading">
      <Loading />
    </div>
    <transition>
      <ul v-for="(paisSelecionado, index) in info" :key="index" class="infoPais">
        <img class="imgPais" :src="paisSelecionado.flag" :alt="paisSelecionado.name" />
        <div>
          <li>Nome: {{ paisSelecionado.translations.br }}</li>
          <li>Capital: {{ paisSelecionado.capital }}</li>
          <li>
            Região:
            <router-link :to="{ path: `/`}" :valores="`${paisSelecionado.region}`">
              {{ paisSelecionado.region }}
            </router-link>
          </li>
          <li>Sub-região: {{ paisSelecionado.subregion }}</li>
          <li>População: {{ paisSelecionado.population }}</li>
          <li>
            Línguas:
            <span v-for="(idiomas, index) in paisSelecionado.languages" :key="index">
              {{ idiomas.nativeName }}
            </span>
          </li>
        </div>
      </ul>
      </transition>
      <div>
        <h3>Países Vizinhos</h3>
        <ul class="bandeiras">
          <li v-for="(paisFronteira, index) in limitarQuantidadePaises" :key="index">
            <router-link
              :to="{ name: 'paisSelecionado', params: { pais: paisFronteira.name } }"
              @click.native="$router.go()"
            >
              <img :src="paisFronteira.flag" :alt="paisFronteira.name" />
            </router-link>
          </li>
        </ul>
      </div>
    
    <Paginacao :bandeiras="bandeiras" :postsPorPagina="postsPorPagina" />
  </section>
</template>

<script>
import { api } from "@/services.js";
import Paginacao from "@/components/Paginacao.vue";

export default {
  name: "paisSelecionado",
  components: {
    Paginacao,
  },
  data() {
    return {
      info: null,
      siglas: null,
      bandeiras: [],
      postsPorPagina: 10,
      loading: false,
      valores: null
    };
  },
  mounted() {
    this.loading = true
    api.get(`/name/${this.$route.params.pais}`).then((r) => {
      this.info = r.data;
      this.siglas = r.data[0].borders;
      this.puxarFronteira();
      this.loading = false;
    });
  },
  computed: {
      limitarQuantidadePaises() {
        return this.bandeiras.slice(((this.$store.state.paginaAtual - 1) * this.postsPorPagina), (this.$store.state.paginaAtual * this.postsPorPagina) )
    }
  },
  methods: {
    puxarFronteira() {
      this.loading = true
      this.siglas.forEach((item) => {
        api.get(`/alpha/${item}`).then((r) => {
          this.bandeiras.push(r.data);
          this.totalPaises = this.bandeiras.length;
          this.loading = false;
        });
      });
    },
  },
};
</script>

<style scoped>
section {
  max-width: 1000px;
}
.infoPais {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
}

.infoPais div {
  line-height: 2.1;
}

.infoPais div li a {
  text-decoration: underline;
}

.imgPais {
  width: 443px;
  height: 258px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

h3 {
  margin-left: 1.5rem;
  margin-top: 2rem;
  font-family: var(--font-primary);
}

.bandeiras li img {
  width: 250px;
  height: 150px;
}

.bandeiras li img {
  margin: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.bandeiras {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

@media (max-width: 900px) {
  .bandeiras {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .infoPais {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .infoPais img {
    margin-bottom: 1rem;
  }

  .infoPais div {
    align-self: flex-start;
  }
}
</style>
