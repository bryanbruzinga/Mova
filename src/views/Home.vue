<template>
  <div>
    <section>
        <form>
            <div class="primeiroSelect">
                <p>Filtrar por</p>
                <select name="opcao" v-model="selecionado">
                    <option value="region">Região</option>
                    <option value="capital">Capital</option>
                    <option value="lang">Língua</option>
                    <option value="flag">País</option>
                    <option value="cod">Código de ligação</option>
                </select>
            </div>
            <button class="btn">Pesquisar</button>
            <ul>
                <li class="lista" v-for="(dados, index) in filterItem" :key="index">
                    <img :src="dados.flag" :alt="dados.name">
                </li>
            </ul>
        </form>
    </section>
  </div>
</template>

<script>

import fetchData from '@/mixins/fetchData.js';

export default {
    name: "home",
    mixins: [fetchData],
    data() {
        return {
            selecionado: 'flag',
        }
    },
    computed: {
        filterItem() {
            return this.api.filter(item => item.region === 'Asia')
        }
    },
    created() {
        this.fetchData('')
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

.lista img {
    width: 316px;
    height: 181px;
}
</style>