<template>
  <section>
    <form>
      <div class="primeiroSelect">
        <p>Filtrar por</p>
        <select name="opcao" v-model="selecionado">
          <option value="">Selecione uma opção</option>
          <option value="region">Região</option>
          <option value="capital">Capital</option>
          <option value="lang">Língua</option>
          <option value="name" selected>País</option>
          <option value="callingcode">Código de ligação</option>
        </select>
      </div>
      <div v-show="selecionado" class="primeiroSelect">
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
          v-else-if="selecionado === 'lang'"
          v-model="valor"
        >
          <option
            v-for="(item, index) in paises"
            :key="index"
            :value="item.languages[0].iso639_1"
          >
            {{ item.languages[0].name }}
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
            >{{ item.callingCodes[0] }}</option
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
            >{{ item.region }}</option
          >
        </select>
      </div>
      <button class="btn" @click.prevent="buscarPaises">Pesquisar</button>
    </form>
    <div v-if="loading">
      <Loading />
    </div>
    <transition>
      <ul class="listaPaises">
        <li v-for="(item, index) in paisesFiltrados" :key="index">
          <router-link
            class="btnBandeira"
            tag="button"
            :to="{ name: 'paisSelecionado', params: { pais: item.name } }"
          >
            <img :src="item.flag" :alt="item.name" />
          </router-link>
        </li>
      </ul>
    </transition>
    <Paginacao
      :totalPaises="totalPaises"
      :paisesPorPagina="paisesPorPagina"
      @change-page="changePage"
      :offset="offset"
    />
  </section>
</template>

<script>
import { api } from "@/services.js";
import Paginacao from "@/components/Paginacao.vue";

export default {
  name: "home",
  components: {
    Paginacao,
  },
  data() {
    return {
      selecionado: "name",
      paises: [],
      valor: "",
      paisesFiltrados: [],
      totalPaises: 0,
      paisesPorPagina: 12,
      loading: false
    };
  },
  methods: {
    puxarPaises() {
      this.loading = true;
      api.get().then((r) => {
        this.paises = r.data;
        this.paisesFiltrados = this.paises;
        this.loading = false;
        this.totalPaises = Math.ceil(
          this.paisesFiltrados.length / this.paisesPorPagina
        );
      });
    },
    buscarPaises() {
      this.loading = true;
      api.get(`/${this.selecionado}/${this.valor}`).then((r) => {
        this.paisesFiltrados = r.data;
        this.totalPaises = this.paisesFiltrados.length;
        this.loading = false;
      });
    },
    changePage(value) {
      this.offset = value;
      this.puxarPaises();
    },
  },
  mounted() {
    this.puxarPaises();
  },
};
</script>

<style scoped>
section {
  overflow: hidden;
}
form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1rem 2rem;
  width: 900px;
}
p {
  color: var(--primary-color);
  font-size: var(--font-size-14);
  font-family: var(--font-primary);
}
select {
  border: none;
  border-bottom: 1px solid #a8a8a8;
  color: var(--secondary-color);
  width: 220px;
  font-family: var(--font-primary);
  background: none;
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
  font-size: var(--font-size-14);
  color: white;
  padding: 0.6rem 1.5rem;
}

.listaPaises {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  margin: 0 auto;
}

.btnBandeira {
  background: none;
  cursor: pointer;
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: 1rem;
}

.btnBandeira img {
  width: 250px;
  height: 150px;
}

@media (max-width: 990px) {
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  }
  form div {
    margin-bottom: 1rem;
  }
  select {
    width: 300px;
  }
  .listaPaises {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .listaPaises {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
