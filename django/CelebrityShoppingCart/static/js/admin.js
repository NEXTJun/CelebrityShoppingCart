var app = new Vue({
  el: "#app",
  data: {
    tmp_item: {
      id: null,
      name: null,
      img: null,
      price: null,
      amount: null,
      imgBase64: null
    },
    itemList: [],
  },
  mounted() {
    this.getRequestItemList();
  },
  methods: {
    // Models Control Function
    setItem: function (item) {
      this.copySettingItemToTmp(item);
    },
    updateItem: function (item) {
      this.putRequestItem();
    },
    removeItem: function (item) {
      this.deleteRequestItem();
      this.cleanTmpItem();
    },
    addSettingItem: function () {
      this.postRequestItemList();
    },
    updateItemImg: function (event, item) {
      this.updateTmpItemImg(event);
      this.changeImgToBase64(event, item);
    },
    updateTmpItemImg: function (event) {
      const data = URL.createObjectURL(event.target.files[0]);
      this.tmp_item.img = data;
    },
    changeImgToBase64: function(event, item) {
      var file = event.target.files[0];
      var reader = new FileReader();
      var self = this;
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        console.log(reader.result);
        self.tmp_item.imgBase64 = reader.result;
      }
      reader.onerror = function (error) {
        console.log(error);
      }
    },
    // Models Control Minor Function
    copySettingItemToTmp: function (item) {
      this.tmp_item.id = item.id;
      this.tmp_item.name = item.name;
      this.tmp_item.img = item.img;
      this.tmp_item.amount = item.amount;
      this.tmp_item.price = item.price;
    },
    updateSettingItem: function (item, copy_item) {
      item.name = copy_item.name;
      item.img = copy_item.img;
      item.amount = copy_item.amount;
      item.price = copy_item.price;
    },
    cleanTmpItem: function () {
      this.tmp_item.id = null;
      this.tmp_item.name = null;
      this.tmp_item.img = null;
      this.tmp_item.amount = null;
      this.tmp_item.price = null;
      this.tmp_item.imgBase64 = null;
    },
    setItemCountProperty: function() {
      for (var i in this.itemList) {
        this.$set(this.itemList[i], 'count', 0);
      }
    },
    // Check Function
    isItemEdited: function (item) {
      return this.tmp_item.id == item.id;
    },
    isEdittingItem: function () {
      return this.tmp_item.id == null;
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
          self.copySettingItemToTmp(self.itemList[index-1]);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteRequestItem: function () {
      var self = this;
      var url = '/api/itemlist/' + this.tmp_item.id;
      axios
        .delete(url)
        .then(function (response) {
          console.log(response.data);
          self.itemList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    putRequestItem: function () {
      var self = this;
      var url = '/api/itemlist/' + this.tmp_item.id + '/';
      const params = new URLSearchParams();
      params.append('name', this.tmp_item.name);
      params.append('amount', this.tmp_item.amount);
      params.append('price', this.tmp_item.price);
      if (this.tmp_item.imgBase64 != null) {
        params.append('imgBase64', this.tmp_item.imgBase64);
      }
      
      axios
        .put(url, params)
        .then(function (response) {
          console.log(response.data);
          self.itemList = response.data;
          self.cleanTmpItem();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {}
});
