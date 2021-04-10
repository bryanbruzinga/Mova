<template>
  <div>
    <section>
        <form>
            <div class="primeiroSelect">
                <p>Filtrar por</p>
                <select name="opcao" v-model="selecionado">
                    <option value="">Selecione uma opção</option>
                    <option value="region">Região</option>
                    <option value="capital">Capital</option>
                    <option value="lang">Língua</option>
                    <option value="name">País</option>
                    <option value="cod">Código de ligação</option>
                </select>
            </div>
            <div v-if="selecionado" class="primeiroSelect">
                <p>{{selecionado}}</p>
                <select name="filtro" v-model="valor">
                    <option v-for="(item, index) in paises" :key=index :value="item.name" >{{item.name}}</option>
                </select>
            </div>
            <button class="btn" @click.prevent="buscarPaises">Pesquisar</button>
            <ul class="listaPaises">
                <li v-for="(item, index) in paisesFiltrados" :key="index">
                    <router-link class="btnBandeira" tag="button" to="/paisselecionado">
                        <img :src="item.flag" :alt="item.name">
                    </router-link>
                </li>
            </ul>
            
        </form>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    
    name: "home",
    data() {
        return {
            url: 'https://restcountries.eu/rest/v2',
            selecionado: 'flag',
            pages: [],
            paises: null,
            valor: '',
            paisesFiltrados: null
        }
    },
    methods: {
        puxarPaises() {
            axios.get(this.url)
            .then(r => {
                this.paises = r.data
                this.paisesFiltrados = this.paises;
                })
        },
        buscarPaises() {
            axios.get(`${this.url}/${this.selecionado}/${this.valor}`)
            .then(r => this.paisesFiltrados = r.data)
        }
    },
    computed: {
        // filterItem() {
        //     return this.api.filter(item => item.flag === this.selecionado)
        // },
    },
    mounted() {
        this.puxarPaises();
    }
}
</script>

<style>
p {
    color: var(--primary-color);
    font-size: var(--font-size-14);
}
select {
    border: none;
    border-bottom: 1px solid #A8A8A8;
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