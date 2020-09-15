var app = new Vue({
  el: "#app",
  data: {
    itemList: [
      {
        id: "1",
        name: "萊莎的鍊金工房 2",
        imgUrl:
          "./img/f8b5b152d5efcbbd42141a9c6e19e5u5.JPG",
        price: "1990",
        count: 0,
        amount: 99
      },
      {
        id: "2",
        name: "薩爾達無雙 災厄啟示錄",
        imgUrl:
          "./img/a31970bdabb8f2d0678c700e2119thn5.JPG",
        price: "2390",
        count: 0,
        amount: 99
      },
      {
        id: "3",
        name: "十三機兵防衛圈",
        imgUrl:
          "./img/f35303289e76f0062dcbb16590170tu5.JPG",
        price: "1790",
        count: 0,
        amount: 99
      },
      {
        id: "4",
        name: "惡靈古堡3",
        imgUrl:
          "./img/b4162ce3568e9a669f182ad471175io5.JPG",
        price: "1790",
        count: 0,
        amount: 99
      }
    ]
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
      return 100000000000 - this.sumItemPrice;
    }
  }
});