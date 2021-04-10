<template>
  <section>
    <ul v-for="(i, index) in info" :key="index" class="infoPais">
      <img class="imgPais" :src="i.flag" :alt="i.name">
      <div>
        <li>Nome: {{i.translations.br}}</li>
        <li>Capital: {{i.capital}}</li>
        <li>Região: {{i.region}}</li>
        <li>Sub-região: {{i.subregion}}</li>
        <li>População: {{i.population}}</li>
        <li>Línguas: {{i.languages[0].nativeName}}</li>
      </div>
    </ul>
    <div>
      <h2>Países Vizinhos</h2>
      <ul class="bandeiras">
        <li v-for="(i, index) in bandeiras" :key="index">
          <img :src="i[0].flag" :alt="i[0].name">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
    name: "paisSelecionado",
    data() {
      return {
        info: null,
        siglas: null,
        bandeiras: []
      }
    },
    mounted() {
      axios.get(`https://restcountries.eu/rest/v2/name/${this.$route.params.pais}`)
      .then(r => {
        this.info = r.data
        this.siglas = r.data[0].borders
        this.puxarFronteira()
      })
    },
    methods: {
      puxarFronteira() {
        this.siglas.forEach(item => {
          axios.get(`https://restcountries.eu/rest/v2/name/${item}`)
          .then(r => this.bandeiras.push(r.data))
        })
      }
    }
}
</script>

<style scoped>
section {
  max-width: 1200px;
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
  line-height: 1.5;
}

.imgPais,
.bandeiras li img {
  width: 316px;
  height: 181px;
}

.bandeiras li img {
  margin: 1rem;
}

.bandeiras{
  display: flex;
}
</style>