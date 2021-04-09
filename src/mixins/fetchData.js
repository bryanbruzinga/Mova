export default {
  data() {
    return {
      api: null,
    };
  },
  methods: {
    fetchData(url) {
      this.api = null;
      fetch(`https://restcountries.eu/rest/v2/${url}`)
        .then((r) => r.json())
        .then((json) => {
          this.api = json;
        });
    },
  },
};
