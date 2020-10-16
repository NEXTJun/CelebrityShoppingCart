const all_money = 100000000000;

var app = new Vue({
  el: "#app",
  data: {
    itemList: [],
  },
  mounted() {
    this.getItemList();
  },
  methods: {
    addItemCount: function (item) {
      if (item.count < item.amount) {
        item.count++;
      } else {
        item.count = item.amount;
      }
    },
    subItemCount: function (item) {
      if (item.count > 0) {
        item.count--;
      }
    },
    checkItemInput: function (item) {
      if (item.count < 0) {
        item.count = 0;
      } else if (item.count > item.amount) {
        item.count = item.amount;
      }
    },
    getItemList: function () {
      var self = this;
      axios
        .get('/api/itemlist')
        .then(function (response) {
          console.log(response.data);
          self.itemList = response.data;
          self.setItemCountProperty();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setItemCountProperty: function() {
      for (var i in this.itemList) {
        this.$set(this.itemList[i], 'count', 0);
      }
    }
  },
  computed: {
    sumItemPrice: function () {
      var sum = 0;
      for (var i in this.itemList) {
        sum += this.itemList[i].price * this.itemList[i].count;
      }
      return sum;
    },
    getBalances: function () {
      return all_money - this.sumItemPrice;
    }
  }
});
