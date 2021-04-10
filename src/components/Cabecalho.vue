<template>
  <header>
    <nav>
      <ul>
        <li>
          <a href="/">
            <img src="@/assets/logo.svg" alt="Mova" />
          </a>
        </li>
        <li>
          <button @click="voltarPagina">
          <img src="@/assets/seta.svg" alt="retornar página" />Voltar</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "cabecalho",
  methods: {
    voltarPagina() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
header {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: white;
}
nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul li {
  margin: 1rem 2rem;
}

nav ul li button {
  background: none;
  color: var(--primary-color);
  border: 1px solid;
  font-size: 1.125rem;
  font-family: var(--primary-font);
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: .3s;
}

nav ul li button:hover {
  color: white;
  background: var(--primary-color)
}

nav ul li button img {
  margin-right: 0.875rem;
}

</style>
