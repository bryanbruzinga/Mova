<template>
  <section>
    <div v-if="loading">
      <Loading />
    </div>
    <transition>
      <ul v-for="(i, index) in info" :key="index" class="infoPais">
        <img class="imgPais" :src="i.flag" :alt="i.name" />
        <div>
          <li>Nome: {{ i.translations.br }}</li>
          <li>Capital: {{ i.capital }}</li>
          <li>
            Região:
            <router-link :to="{ path: `/region/${i.region}` }">
              {{ i.region }}
            </router-link>
          </li>
          <li>Sub-região: {{ i.subregion }}</li>
          <li>População: {{ i.population }}</li>
          <li>
            Línguas:
            <span v-for="(idiomas, index) in i.languages" :key="index">
              {{ idiomas.nativeName }}
            </span>
          </li>
        </div>
      </ul>
      </transition>
      <div>
        <h3>Países Vizinhos</h3>
        <ul class="bandeiras">
          <li v-for="(i, index) in bandeiras" :key="index">
            <router-link
              :to="{ name: 'paisSelecionado', params: { pais: i.name } }"
              @click.native="$router.go()"
            >
              <img :src="i.flag" :alt="i.name" />
            </router-link>
          </li>
        </ul>
      </div>
    
    <Paginacao :totalPaises="totalPaises" :paisesPorPagina="paisesPorPagina" />
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
      totalPaises: 0,
      paisesPorPagina: 12,
      loading: false
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
