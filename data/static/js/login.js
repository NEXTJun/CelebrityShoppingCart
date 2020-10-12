var app = new Vue({
  el: "#app",
  data: {
    username: null,
    password: null
  },
  methods: {
    loginAdmin: function () {
      axios
        .post("", { username: this.username, password: this.password })
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  computed: {}
});
