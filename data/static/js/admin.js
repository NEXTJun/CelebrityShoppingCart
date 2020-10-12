var app = new Vue({
  el: "#app",
  data: {
    tmp_item: [
      {
        index: null,
        id: null,
        name: null,
        imgUrl: null,
        price: null,
        amount: null,
        imgBase64: null
      }
    ],
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
    ]
  },
  mounted() {
    this.getRequestItemList();
  },
  methods: {
    // Models Control Function
    setItem: function (index, item) {
      this.copySettingItemToTmp(index, item);
    },
    updateItem: function (index, item) {
      this.updateSettingItem(item, this.tmp_item[0]);
      this.cleanTmpItem();
    },
    removeItem: function (index, item) {
      this.removeSettingItem();
      this.cleanTmpItem();
    },
    addSettingItem: function () {
      var index = this.itemList.length;
      this.itemList.push({
        name: "",
        imgUrl: "",
        price: 0,
        count: 0,
        amount: 0
      });
      this.copySettingItemToTmp(index, this.itemList[index]);
    },
    updateTmpItemImg: function (event) {
      const data = URL.createObjectURL(event.target.files[0]);
      this.tmp_item[0].imgUrl = data;
    },
    changeImgToBase64: function(event, item) {
    },
    // Models Control Minor Function
    copySettingItemToTmp: function (index, item) {
      this.tmp_item[0].index = index;
      this.tmp_item[0].id = item.id;
      this.tmp_item[0].name = item.name;
      this.tmp_item[0].imgUrl = item.imgUrl;
      this.tmp_item[0].amount = item.amount;
      this.tmp_item[0].price = item.price;
    },
    updateSettingItem: function (item, copy_item) {
      item.name = copy_item.name;
      item.imgUrl = copy_item.imgUrl;
      item.amount = copy_item.amount;
      item.price = copy_item.price;
    },
    removeSettingItem: function () {
      this.itemList.splice(this.tmp_item[0].index, 1);
    },
    cleanTmpItem: function () {
      this.tmp_item[0].index = null;
      this.tmp_item[0].id = null;
      this.tmp_item[0].name = null;
      this.tmp_item[0].imgUrl = null;
      this.tmp_item[0].amount = null;
      this.tmp_item[0].price = null;
      this.tmp_item[0].imgBase64 = null;
    },
    // Check Function
    isItemEdited: function (index) {
      return this.tmp_item[0].index == index;
    },
    isEdittingItem: function () {
      return this.tmp_item[0].index == null;
    },
    // RESTful Api Function
    getRequestItemList: function () {
    },
    postRequestItemList: function () {
    },
    deleteRequestItem: function () {
    },
    putRequestItem: function (item) {
    },
  },
  computed: {}
});
