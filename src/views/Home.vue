<template>
    <section>
      <form>
        <div class="primeiroSelect">
          <p>Filtrar por</p>
          <select name="opcao" v-model="selecionado">
            <option value="">Selecione uma opção</option>
            <option value="region">Região</option>
            <option value="capital">Capital</option>
            <option value="languages">Língua</option>
            <option value="name" selected>País</option>
            <option value="callingcode">Código de ligação</option>
          </select>
        </div>
        <div v-if="selecionado" class="primeiroSelect">
          <p>{{ selecionado }}</p>
          <select name="filtro" v-if="selecionado === 'name'" v-model="valor">
            <option
              v-for="(item, index) in paises"
              :key="index"
              :value="item.name"
              >{{ item.name }}</option
            >
          </select>
          <select
            name="filtro"
            v-else-if="selecionado === 'languages'"
            v-model="valor"
          >
            <option
              v-for="(item, index) in paises"
              :key="index"
              :value="item.languages"
            >
              {{ item.languages }}
            </option>
          </select>
          <select
            name="filtro"
            v-else-if="selecionado === 'callingcode'"
            v-model="valor"
          >
            <option
              v-for="(item, index) in paises"
              :key="index"
              :value="item.callingCodes"
              >{{ item.callingCodes }}</option
            >
          </select>
          <select
            name="filtro"
            v-else-if="selecionado === 'capital'"
            v-model="valor"
          >
            <option
              v-for="(item, index) in paises"
              :key="index"
              :value="item.capital"
              >{{ item.capital }}</option
            >
          </select>
          <select
            name="filtro"
            v-else-if="selecionado === 'region'"
            v-model="valor"
          >
            <option
              v-for="(item, index) in paises"
              :key="index"
              :value="item.region"
              >{{ item.region | filtrar }}</option
            >
          </select>
        </div>
        <button class="btn" @click.prevent="buscarPaises">Pesquisar</button>
        <ul class="listaPaises">
          <li v-for="(item, index) in paisesFiltrados" :key="index">
            <router-link
              class="btnBandeira"
              tag="button"
              :to="{ name: 'paisSelecionado', params: { pais: item.name }}"
            >
              <img :src="item.flag" :alt="item.name" />
            </router-link>
          </li>
        </ul>
      </form>
      <Paginacao v-if="paisesFiltrados.length" :offset="offset" :total="total" :limit="limit" @change-page="changePage" />
    </section>
</template>

<script>
import axios from "axios";
import Paginacao from '@/helpers/Paginacao.vue';

export default {
  name: "home",
  components: {
      Paginacao
  },
  data() {
    return {
      url: "https://restcountries.eu/rest/v2",
      selecionado: "name",
      paises: [],
      valor: "",
      paisesFiltrados: [],
    };
  },
  methods: {
    puxarPaises() {
      axios.get(this.url).then((r) => {
        this.paises = r.data;
        this.paisesFiltrados = this.paises;
      });
    },
    buscarPaises() {
      axios
        .get(`${this.url}/${this.selecionado}/${this.valor}`)
        .then((r) => (this.paisesFiltrados = r.data));
    },
    filtrar(valor) {
      valor.filter((valor1, valor2) => {
        return valor.indexOf(valor1) === valor2;
      });
    },
  },
  mounted() {
    this.puxarPaises();
  },
};
</script>

<style>
p {
  color: var(--primary-color);
  font-size: var(--font-size-14);
}
select {
  border: none;
  border-bottom: 1px solid #a8a8a8;
  color: var(--secondary-color);
  width: 220px;
}

select option {
  color: var(--secondary-color);
  font-weight: bold;
  font-size: var(--font-size-14);
}

.btn {
  background: var(--primary-color);
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  padding: 5px 18px;
}

.listaPaises {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 40vh;
}

.btnBandeira {
  background: none;
  cursor: pointer;
  border: none;
}

.btnBandeira img {
  width: 316px;
  height: 181px;
}
</style>
