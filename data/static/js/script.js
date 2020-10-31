const all_money = 100000000000;

var app = new Vue({
  el: "#app",
  data: {
    itemList: [
      {
        id: 1,
        name: "萊莎的鍊金工房 2",
        imgUrl: "media/img/f8b5b152d5efcbbd42141a9c6e19e5u5.jpg",
        price: 1990,
        count: 0,
        amount: 99
      },
      {
        id: 2,
        name: "薩爾達無雙 災厄啟示錄",
        imgUrl: "media/img/a31970bdabb8f2d0678c700e2119thn5.jpg",
        price: 2390,
        count: 0,
        amount: 99
      },
      {
        id: 3,
        name: "十三機兵防衛圈",
        imgUrl: "media/img/f35303289e76f0062dcbb16590170tu5.jpg",
        price: 1790,
        count: 0,
        amount: 99
      },
      {
        id: 4,
        name: "惡靈古堡3",
        imgUrl: "media/img/b4162ce3568e9a669f182ad471175io5.jpg",
        price: 1790,
        count: 0,
        amount: 99
      }
    ],
    checkout_info_list: [
      {
        range_min: 0,
        range_max: 5000,
        title: "Gabe Joke",
        imgUrl: "static/img/Gabe-Joke.jpg",
        content: "Your purchasing is a joke!",
      },
      {
        range_min: 5000,
        range_max: 20000,
        title: "Gabe Good",
        imgUrl: "static/img/Gabe-Good.jpg",
        content: "The Summer Sale is upon us!",
      },
      {
        range_min: 20000,
        range_max: 50000,
        title: "Gabe Master",
        imgUrl: "static/img/Gabe-Master.jpg",
        content: "My child, I return thine wallet bare. Now go forth to your digital playgrounds and frolic.",
      },
      {
        range_min: 50000,
        range_max: 200000,
        title: "Gabe King",
        imgUrl: "static/img/Gabe-King.jpg",
        content: "In Gaben. We Trust.",
      },
      {
        range_min: 200000,
        range_max: 500000,
        title: "Gabe Moses",
        imgUrl: "static/img/Gabe-Moses.jpg",
        content: "What comes after 2?",
      },
      {
        range_min: 500000,
        range_max: all_money,
        title: "Gabe God",
        imgUrl: "static/img/Gabe-God.jpg",
        content: "To our god, G Fat, we hand over our wallets.",
      },
    ]
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
    },
    checkCheckoutInfoInRange: function (item) {
      var num = this.sumItemPrice;
      return (num >= item.range_min && num < item.range_max)
    },
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
    },
  }
});