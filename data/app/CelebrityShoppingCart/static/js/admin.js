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
    itemList: [],
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
      this.putRequestItem(item);
    },
    removeItem: function (index, item) {
      this.deleteRequestItem();
    },
    updateTmpItemImg: function (event) {
      const data = URL.createObjectURL(event.target.files[0]);
      this.tmp_item[0].imgUrl = data;
    },
    changeImgToBase64: function(event, item) {
      var file = event.target.files[0];
      var reader = new FileReader();
      var self = this;
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        console.log(reader.result);
        self.tmp_item[0].imgBase64 = reader.result;
      }
      reader.onerror = function (error) {
        console.log(error);
      }
    },
    addSettingItem: function () {
      this.postRequestItemList();
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
      var self = this;
      axios
        .get('/api/itemlist')
        .then(function (response) {
          console.log(response.data);

          self.itemList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postRequestItemList: function () {
      var self = this;
      axios
        .post('/api/itemlist/')
        .then(function (response) {
          console.log(response.data);

          var item = response.data;
          self.itemList.push(item);

          var index = self.itemList.length;
          self.copySettingItemToTmp(index-1, self.itemList[index-1]);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteRequestItem: function () {
      var self = this;
      var url = '/api/itemlist/' + this.tmp_item[0].id;
      axios
        .delete(url)
        .then(function (response) {
          console.log(response.data);

          self.removeSettingItem();
          self.cleanTmpItem();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    putRequestItem: function (item) {
      var self = this;
      var url = '/api/itemlist/' + this.tmp_item[0].id + '/';
      const params = new URLSearchParams();
      params.append('name', this.tmp_item[0].name);
      params.append('amount', this.tmp_item[0].amount);
      params.append('price', this.tmp_item[0].price);

      if (this.tmp_item[0].imgBase64 != null) {
        params.append('imgBase64', this.tmp_item[0].imgBase64);
      }
      
      axios
        .put(url, params)
        .then(function (response) {
          console.log(response.data);
          
          self.updateSettingItem(item, response.data);
          self.cleanTmpItem();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {}
});
