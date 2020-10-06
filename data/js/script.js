const all_money = 100000000000;

var app = new Vue({
  el: "#app",
  data: {
    itemList: [
      {
        id: 1,
        name: "萊莎的鍊金工房 2",
        imgUrl: "https://github.com/NEXTJun/CelebrityShoppingCart/blob/gh-pages/data/img/f8b5b152d5efcbbd42141a9c6e19e5u5.jpg?raw=true",
        price: 1990,
        count: 0,
        amount: 99
      },
      {
        id: 2,
        name: "薩爾達無雙 災厄啟示錄",
        imgUrl: "https://github.com/NEXTJun/CelebrityShoppingCart/blob/gh-pages/data/img/a31970bdabb8f2d0678c700e2119thn5.jpg?raw=true",
        price: 2390,
        count: 0,
        amount: 99
      },
      {
        id: 3,
        name: "十三機兵防衛圈",
        imgUrl: "https://github.com/NEXTJun/CelebrityShoppingCart/blob/gh-pages/data/img/f35303289e76f0062dcbb16590170tu5.jpg?raw=true",
        price: 1790,
        count: 0,
        amount: 99
      },
      {
        id: 4,
        name: "惡靈古堡3",
        imgUrl: "https://github.com/NEXTJun/CelebrityShoppingCart/blob/gh-pages/data/img/b4162ce3568e9a669f182ad471175io5.jpg?raw=true",
        price: 1790,
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
      return all_money - this.sumItemPrice;
    }
  }
});