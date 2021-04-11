<template>
  <div class="loadingContainer">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
    name: "loading",
}
</script>

<style scoped>
.loadingContainer {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
    border: 6px solid var(--background);
    border-top-color: var(--primary-color);
    height: 100px;
    width: 100px;
    border-radius: 50%;
    animation: rotating 1s infinite;
}

@keyframes rotating {
    to {
        transform: rotate(1turn);
    }
}

</style>