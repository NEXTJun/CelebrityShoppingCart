# CelebrityShoppingCart
A simple meme shopping cart web practice 

>Demo :
>https://nextjun.github.io/CelebrityShoppingCart/data

>Project (BETA) :
>http://35.185.161.198

---

## :memo: TODO List

### Step 1: web頁面

- [ ] 遊戲性增加
- [ ] 登入頁面改vue.js處理
- [ ] 增加測試帳號至管理商品頁面
- [ ] CSS動畫效果
- [ ] 增加favicon.ico
- [ ] icon、non-image檔案
  
### Step 2: 後端框架應用
- [ ] 研究安全防護
- [ ] 導入nginx

### Step 3: 資料庫功能
- [ ] docker PostgreSQL對接
- [ ] GCP PostgreSQL對接
- [ ] 導入redis

### Step 4: 雲端部屬
- [ ] 研究K8S部屬

### Step 5: 其他
- [ ] 文件內容補齊
- [ ] 框架、資料庫、雲端 md拆分

## 一、 前言

儘管現在Arduino推出大量的模組, 對Maker來說能很方便的接線快速做出Prototype, 不用像早期8051時期要自己layout電路板勞心勞力, 但做出的產品侷限在單一的小裝置。為了擴增裝置的規模, 讓MCU Project不僅僅只是sensor感應、led閃爍和伺服馬達轉動, Maker們將無線通訊的概念加進來, 藍芽、wifi之類，甚至更底層的RF加進來, 這讓專案不受距離限制更有互動性。然而, 擴增硬體帶來的互動性增加, 也意味著複雜度的提高, 讓專案的重現性更加困難, 造成許多作品只是分享在社群媒體上自嗨, 除了少數真有商轉價值的, 其餘都像煙火般稍縱即逝。

讓作品的曝光性和使用度增加, 能帶給一般群眾方便, 升級IOT軟體層面的功能性是最有效益的~~誰叫我沒錢開模lay板產品化~~。除了能有效降低互動input裝置的成本外, 包裝上也更加美觀, 不會帶來滿滿的玩具廉價感, 更重要的是, 程式的複製呈現更方便。

有了ESP8266和ESP32後, 裝置連網的技術難度從超難降為中等, 連網是連網了, 但技術門檻導致大部分的創作者被隔絕掉, 要怎麼有趣有用是當今Maker社群要思考的, 簡單說就是缺創意。裝置連網最常見的專題有以下幾種：在網頁呈現按鈕讓LED開關閃爍、ESP32-CAM顯示影像在網頁上、溫溼度資料傳送至ThingSpeak之類的雲端資料庫、感測器數據傳送至MQTT或IFTTT串接各類服務、串接Blynk透過手機APP遙控。

言歸正傳, 此專案和MCU沾不上邊, 只是用來練手軟體的規模能複雜到什麼程度, 以及紀錄建立專案時填坑的筆記, 好方便日後有好的Idea時, 不論是和IOT有沒有關係, 都可以快速做出Prototype Demo。

>## 專案難度: ★★★★★

---

## 二、 環境架構

### (一) 環境版本
版本選擇的標準是製作此專案的時間點下, 各軟體所釋出的穩定版。

#### 1. 前端Web框架
+ Bootstrap 4.x
+ Vue.js 2.x

#### 2. 後端程式語言
+ Python 3.7

#### 3. 後端Web框架
+ Django 2.2

#### 4. 資料庫
+ PostgreSQL 12.4

#### 5. 虛擬化技術
+ Docker

前端框架的選擇上以快速上手為標準, 看中於Bootstrap在RWD和Vue.js操作DOM的便利性。

後端使用Python開發的原因為：輕便、跨平台、OOP。 框架上採Django是因為有完整的MVC架構, 雖然Flask輕便快速, 做簡單的服務容易, 但如果立志是要架Web上線, 那使用Django會更容易維護, 未來要轉其他語言的框架較能融會貫通。

資料庫選擇上以Django有支援的優先, 無奈熟悉的MySQL沒有docker arm cpu的版本...
~~反正都用ORM, 資料庫是哪個也沒差~~

---

## 三、 框架應用

### (一) 框架介紹

Django是Python有名的Web Framework, 透過MVC架構, 將SQL、html、python做切分, 避免語言的雜亂影響閱讀, 並方便設計師分工負責的功能。此外也內建登入系統、後台管理、表單、檔案上傳、資料庫連結等功能, 方便網站建構。

Django使用MTV架構對MVC架構作解釋區分, 以下表格為兩者間的對應關係

| 任務         | MVC架構            | MTV架構
| ----------- |:----------------- |:-------------
| 資料庫連結操作 | M=模型(model)      | M=模型(model)
| 網頁的設計樣式 | V=視圖(view)       | T=模版(template)
| 功能的控制整合 | C=控制(controller) | V=視圖(view)

### (二) 建立專案
#### 1. 安裝
#### (1) 更新套件
```shell
pip install pip -U
```
#### (2) 安裝Django
```shell
pip install Django==2.2
```
#### (3) 安裝其他套件
```shell
pip install Pillow==6.2.2
```
Pillow是資料庫的ImageField需要

#### 2. 初始建立
#### (1) 建立新專案
```shell
django-admin.py startproject [專案名稱]
```
執行後會在當前目錄底下建立專案資料夾, 因git上實際名稱的**celebrityShoppingCart**太長, 此文件將專案名稱以**mysite**代替, 完整指令為`django-admin.py startproject mysite`

全新專案的資料夾內容為
```shell
mysite/
├── mysite
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

#### 各程式用途
| 檔案           |  說明
| ------------- |:-----------------
| `__init__.py` | python認識資料夾為package所需建立的空檔
| `settings.py` | 專案設定檔
| `urls.py`     | 指定URL導向的配置檔
| `wsgi.py`     | Django進入點, 為網頁伺服器對接檔
| `manage.py`   | 提供管理、建置、啟動和CLI環境的功能檔

#### (2) 初始設定
因此專案開發上, 筆者是另外把樹莓派當Server, 再透過Windows PC連線過去, 而非在本機端上開發, 所以需做部分初始設定, 才可正常連線。

修改`setting.py`內容為
```django
ALLOWED_HOSTS = ['*']
```

順便修改`setting.py`內的語言和時區
```django
LABGUAGE_CODE = 'zh-Hant'
TIME_ZONE = 'Asia/Taipei'
```

#### (3) 初始驗證
進到專案名稱的資料夾內, 啟動網頁服務
```shell
python manage.py runserver 0:80
```
確認是否出現安裝成功的訊息

#### 3. 修改前端
為了要將前端與後端對接, Django的template提供了一些語法, 讓函式變數可以控制DOM。因部分DOM操作功能已交給Vue.js處理, 這邊列出些修改上的注意事項。

#### (1) 解決衝突
因Vue.js對DOM操作的標示符號為 `{{變數}}`, 這和模版對變數的標示符號相同, 進而造成衝突, 解決的方法有幾種

1. 改變Vue.js對標示符號的形式, 本人不偏好
2. 讓Django的template無視內容, 此方法可用以下tag宣告區域內的內容不被渲染

```html
{% verbatim %}
不被模板影響的內容
{% endverbatim %}
```

#### (2) 本機端資源引用
在開發前端階段, 會將圖片、資源等檔案放在目錄底下, 但Django卻無法直接對應靜態網頁開發時的資源位置, 因此html需做改寫, 以下說明處理步驟

#### a. 修改setting.py設定
```django
STATIC_URL = '/static/'

# Add setting define 
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
```

**DEBUG = TRUE** 時, 可使用下面方式設定靜態檔位置

`STATIC_URL`：為靜態資源的放置位置, 已預設的`/static/`為例, django會從各應用程式中的static資料夾中搜尋資源, 此專案為例, 位置為`mysite/mysite/static`, 如果其他應用程式也須使用資源, 位置會是在`mysite/otherapps/static`

`STATICFILES_DIRS`：因STATIC_URL會在各應用程式中特定的資料夾找資源, 但如果不同應用程式有同名資源檔, 會造成無法判別, 因此建議在專案目錄底下設定統一的資源目錄, 路徑則在STATICFILES_DIRS設定, 以此範例為例, 位置為`mysite/static`

**DEBUG = FALSE** 時, 可使用下面方式設定靜態檔位置

`STATIC_ROOT`：因正式部屬時, 位置會由伺服器決定, 設定此路徑並使用下列指令後, django會自動將各應用程式用到的資源統一集中至指定資料夾內, 方便日後管理

```shell
python manage.py collectstatic
```

#### b. 修改資源引用位置

**DEBUG = TRUE** 時

html的資源位置可改寫成以下幾種
```html
<img src="/static/img/logo.png">
```

```html
{% load static %}

<img src="{% static "img/logo.png" %}">
```

使用模版設定的自動讀取, 可避免在修改`STATIC_URL`後會讓`/static/img/logo.png`的寫法失效, 屆時系統會自動修改路徑 ~~因為符號衝突, 懶得一直宣告無視區域, 還是習慣用第一種~~

#### 3. URL配置
Django會根據使用者連線網址後所帶的url字串, 把使用者導向去獲取不同頁面, `url.py`就是負責解析url內容, 並指引去執行各函式的配置檔

Example:

假如我們在`mysite/mysite/`底下新增一個負責回傳網頁的`views.py`檔, 並建立一個`here`函式用來回傳指定的html檔, 目的是當使用者在本機端`127.0.0.1`中, 輸入`127.0.0.1/here/`後, 可以得到here.html的網頁內容, 則需要在`url.py`內建立指引用的函式, 修改內容如下

#### a. 增加url.py內容

```Django
from django.urls import path
from . import views

urlpatterns = [
    path('here/', views.here),
]
```

`from . import views` 用意是導入`mysite/mysite/views.py` 檔案
`path('here/', views.here)` 是指定如果在網址後的字串字串內容為`here/`, 則去執行`views.here` 的函式

#### 4. 視圖撰寫
這邊用視圖稱呼, 是因為對Django而言, web頁面的內容可以透過函式變數, 搭配template語法, 去控制改變DOM, 讓web頁面動態化。 但在此專案中, DOM是交由Vue.js搭配RESTful api去控制, 在此不細講變數與template語法的搭配, 重點去講如何操作GET/POST回傳的內容

Example:

套用URL配置教學的情境, 如果要回傳`here.html`, 我們可以建立`mysite/mysite/views.py` 檔案, 不一定要取名為views, 這名稱的用意在相容MVC的定義名。我們在`views.py`內建立一個`here`函式, 來回傳`here.html`

#### (1) 增加setting.py設定
我們需要在專案內建立一個目錄, 專門放html檔, 我們可以建立`mysite/templates`放置模版, 因為是新建立的目錄, 需要讓Django認識位置, 因此要增加`setting.py`內容, 宣告模版放置位置

```django
TEMPLATES = [
    {
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
    }
```

在`TEMPLATES`內的`DIRS`, 增加路徑位置為專案目錄底下的`templates`目錄

#### (2) 撰寫views.py內容
```django
from django.shortcuts import render

def here(request):
    return render(request, "here.html")
```

如果我們要輸出html頁面, 可以使用render函式, 將`here.html`內容以text/html格式回傳

#### (3) 解析request
由於RESTful api會對網址做GET/POST操作, 我們可以在`views.py`的函式中, 解析request物件, 確定請求型式以及代的參數值

#### a. 獲得請求型式
```django
if request.method == 'GET':
    do_something()
elif request.method == 'POST':
    do_something_else()
```

使用`request.method`獲得字串格式的HTTP Method型式

#### b. 獲得參數值

```django
request.GET['KEY']
request.GET.get('KEY', 'default_value')

request.POST['KEY']
request.POST.get('KEY', 'default_value')
```

有兩種方法得到參數值, 第一種為python的鍵值方法, 但缺點是參數未存在指定的KEY時, 會回傳KeyError, 因此建議使用第二種的get(), 如果未存在指定的KEY時, 會回傳default_value值

需注意, 如果前端使用`<form>`, 搭配`<button type="submit">`的方法時, 參數會以x-www-form-urlencoded的格式回傳, 也就是`KEY1=value1&KEY2=value2`的樣式, 此時使用request.POST.get(), 會自動將此格式轉換成鍵值, 可成功獲取資料。但如果使用部分ajax函式的POST方法, 有些會以Json或form-data格式, 此時無法成功獲取資料, 需使用`request.body`的方法得到原始字串後, 再做解析

筆記: request.read()會將buffer清空, 影響後續取值, 盡量避免使用

#### 4. 資料庫操作

#### (1) 建立應用程式

對django而言, 資料庫操作可模組化成一個應用程式, 因此需先專案資料夾內建立新應用程式

```shell
python manage.py startapp [應用程式名稱]
```
執行後會在專案目錄底下建立新應用程式資料夾, 此處應用程式名稱暫以**database**取名, 完整指令為`python manage.py startapp database`

專案內全新的應用程式資料夾內容為
```shell
mysite/
├── database
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations.py
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
└── manage.py
```

#### (2) 安裝應用程式

為了讓專案使用此應用程式, 需在專案內的設定加入此應用程式名稱

#### 增加setting.py設定
```django
INSTALLED_APPS = [
    ...
    '應用程式名稱',
]
```

#### (3) 連結資料庫
如果沒有做資料庫參數設定, Django預設使用的資料庫是SQLite, 為了連結其他資料庫, 需在專案內的設定檔加入參數

#### 修改setting.py設定
```django
DATABASES = {
    'default': {
        'ENGINE': '資料庫轉譯庫',
        'NAME': 'DB_NAME',
        'USER': 'DB_USER',
        'PASSWORD': 'DB_PASSWORD',
        'HOST': 'DB_IP',    #default local 127.0.0.1
        'PORT': 'DB_PORT',
    }
}
```
Django 2.2官方支援的資料庫有
+ PostgreSQL : `django.db.backends.postgresql_psycopg2`
psycopg2無內建, 需另行安裝
`pip install psycopg2`
+ MySQL : `django.db.backends.mysql`
+ Oracle : `django.db.backends.oracle`
+ SQLite : `django.db.backends.sqlite3`

如果使用的資料庫未在此列表內, 須找第三方套件解決

#### (4) 建立模型
Django對SQL的操作使用ORM(Object Relational Mapping, 物件關聯映射)的技術, 簡單說就是以函數的方式操作SQL, 好處是使用簡化通用的函式替代SQL語言, 避免不同資料庫的語法差異, 壞處是轉譯的耗費的效能

#### a. 新增model.py內容

撰寫 `mysite/database/model.py`, 定義模型資料欄位

#### 常用類別
| Field types          | 參數                | 說明
| -------------------- |:------------------ |:-------------
| BooleanField         |                    | 布林值
| IntegerField         |                    | 整數, 範圍 -2147483648 ~ 2147483647
| PositiveIntegerField |                    | 正整數, 範圍 0 to 2147483647
| FloatField           |                    | 浮點數
| CharField            | max_length = (uint) 最大字串長度 | 有上限限制的字串
| TextField            |                    | 無上限限制的字串
| DateField            | auto_now = (bool) 物件儲存時自動記錄目前日期, auto_now_add = (bool) 在物件建立時自動記錄目前日期 | 日期格式
| DateTimeField        | auto_now = (bool) 物件儲存時自動記錄目前日期時間, auto_now_add = (bool) 在物件建立時自動記錄目前日期時間 | 日期時間格式
| EmailField           | max_length = (uint8) 最大字串長度254字元 | 郵件字串
| FileField            | upload_to = (path) | 檔案格式 
| ImageField           | upload_to = (path) | 圖片檔案格式

`FileField`和`ImageField`的upload_to路徑為MEDIA_ROOT下的路徑位置, 檔案格式可用`SimpleUploadedFile(名稱, 內容)`和`default_storage.save(名稱, 內容)`來產生

注意, 使用`ImageField`需安裝pillow, 安裝pillow時又須要當場編譯, 因此docker image不能用不含編譯函式庫精簡化的python-slam

如果要使用外鍵, 外鍵函式為 `ForeignKey(to, on_delete, **options)`, to為字串表示的表格名稱, on_delete為被刪除時的處理方式, 有以下幾種參數
+ `CASCADE`     : to的主TABLE被刪除時, 子TABLE一並被刪除
+ `PROTECT`     : 跳出錯誤, 阻止被删除
+ `SET_NULL`    : 用null替代
+ `SET_DEFAULT` : 用預設值替代

#### 常用參數
| Options     | Type | 說明
| ----------- |:---- |:-------------
| null        | bool | 可否為null, 預設為False
| blank       | bool | 可否為空白內容, 預設為False
| default     |      | 預設值
| primary_key | bool | 是否為主鍵, 預設為False
| unique      | bool | 是否為唯一值, 預設為False
| editable    | bool | 是否可顯示, 預設為True

Example: 

```django
from django.db import models

class Class(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
class Student(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    birthday = models.DateField()
    email = models.CharField(max_length=100, blank=True, default='')
    class_id = models.ForeignKey('Class', on_delete=models.SET_DEFAULT, blank=True, default='')
    
    def __str__(self):
        return self.name
```

覆寫`__str__(self)` , 可使管理介面中, 設定資料的顯示的內容

完成撰寫後可使用django的錯誤檢查, 確認設計是否有問題

```shell
python manage.py check
```


#### b. 建立修改紀錄
每當新增或修改model.py內容, 需使用migration技術建立差異紀錄, 目的是為了解決資料庫架構更動的問題

```shell
python manage.py makemigrations [應用程式名]
```

Example: 

`python manage.py makemigrations database`

#### c. 模型與資料庫同步

```shell
python manage.py migrate [應用程式名] [版本編號]
```
Example: 

`python manage.py migrate database 0001`

#### d. CLI環境下資料操作

如果要在事前增加資料, 可使用django的cli環境, 輸入資料, 也可驗證資料庫


進入django shell
```shell
python manage.py shell
```

#### 常用函式
| Fuction     | 說明
| ----------- |:-----------------
| create      | 建立並寫入資料
| get         | 取得一筆資料, 如存在多筆, 則觸發例外Error
| all         | 取得所有筆資料
| filter      | 過濾資料
| order_by    | 排序資料
| update      | 更新資料內容
| delete      | 刪除資料

Example: 

```shell
##在shell模式下, 需先引入函式
>>> from database.models import Class, Student
##引入DateField格式所需的datetime函式
>>> import datetime
```

#### (a) Create
```shell
>>> class0 = Class.objects.create(id=101, name='apple', address='2th floor')
>>> class0
<Class: apple>

>>> Student.objects.create(id=11, name='John', birthday=datetime.date(1997, 10, 19), class_fk=class0)
<Student: John>
>>> Student.objects.create(id=12, name='Amy', birthday=datetime.date(1997, 4, 1), class_fk=class0)
<Student: Amy>
```

建立資料, 可使用變數儲存物件, 以範例的`class0`為例, type為 `<class 'database.models.Class'>`

#### (b) Read
```shell
>>> student0 = Student.objects.get(id=11)
>>> student0
<Student: John>

>>> student0.name
'John'
>>> student0.class_fk
<Class: apple>
```

使用get取得單一資料物件, 以物件結構取得參數值, 
如參數類別為外鍵, 則參數值為另一個物件

```shell
>>> Student.objects.all()
<QuerySet [<Student: John>, <Student: Amy>]>

>>> Student.objects.filter(id=11)
<QuerySet [<Student: Tom>]>

>>> Class.objects.get(id=101).student_set.all()
<QuerySet [<Student: John>, <Student: Amy>]>
```
使用all取得全部資料, 使用filter取得過濾後的多筆資料, 變數type為QuerySet, 可使用陣列方式取得單一物件, 例: `Student.objects.all()[0]`, 會取得`<Student: John>`

父表格, 可使用子表格的TABLE小寫名加上`_set`, 取得子表格列表

```shell
>>> Student.objects.all()
<QuerySet [<Student: Peter>, <Student: Amy>]>

>>> Student.objects.order_by('-id') #反向排序
<QuerySet [<Student: Amy>, <Student: Peter>]>
```
使用order_by可將多筆資料根據指定欄位做排序


#### (c) Update
```shell
>>> Student.objects.filter(id=11).update(name='Tom')
1
>>> Student.objects.all()
<QuerySet [<Student: Tom>, <Student: Amy>]>

>>> student0 = Student.objects.get(id=11)
>>> student0
<Student: Tom>
>>> student0.name = 'Peter'
>>> student0.save()
>>> Student.objects.all()
<QuerySet [<Student: Peter>, <Student: Amy>]>
```
update只能對QuerySet使用, 除了用update函式外, 也可以變數直接指派物件參數後, 再將變數儲存

#### (d) Delete
```shell
>>> Student.objects.get(id=11).delete()
(1, {'database.Student': 1})
>>> Student.objects.all().delete()
<QuerySet []>
```
delete可對單一物件和QuerySet使用, 將永久刪除資料。delete回傳的第一個數值為成功刪除的物件數

#### 5. 建立表單模型
Django可對表單模型化, 自動生成html`<table>`元件, 或比對Query的內容是否和表單要求吻合

#### a. 新增form.py內容

撰寫 `mysite/database/form.py`, 定義模型資料欄位

#### 常用類別
| Field types          | 參數                | 說明
| -------------------- |:------------------ |:-------------
| BooleanField         |                    | 布林值
| IntegerField         | max_value = (int) 最大值, min_length = (int) 最小值 | 整數, 範圍 -2147483648 ~ 2147483647
| FloatField           | max_value = (float) 最大值, min_length = (float) 最小值 | 浮點數
| CharField            | max_length = (uint) 最大字串長度, min_length = (uint) 最小字串長度, strip = (bool) 是否消除字首尾空白, 預設為True | 有上限限制的字串
| DateField            |                    | 日期格式
| DateTimeField        |                    | 日期時間格式
| EmailField           | max_length = (uint) 最大字串長度, min_length = (uint) 最小字串長度 | 郵件字串

#### 常用參數
| Options        | Type   | 說明
| -------------- |:------ |:-------------
| required       | bool   | 可否為空白內容, 預設為False
| initial        |        | 預設值
| label          | string | 表格項目標題名
| error_messages | string | 修改錯誤回傳訊息

常見的`error_messages`類別有以下幾種
+ `required`   : 未找到資料
+ `invalid`    : 格式錯誤 
+ `max_length` : 超過最大長度
+ `min_length` : 超過最小長度
+ `max_value`  : 超過最大數值
+ `min_value`  : 超過最小數值

Example: 

```django
from django import forms

class StudentForm(forms.Form):
    name = forms.CharField(max_length=20)
    grade = forms.IntegerField(min_value=0, required=0)
    email = forms.CharField(max_length=100, required=True)
    
```

#### 常用函式
| Fuction      | 說明
| ------------ |:-----------------
| is_bound     | 確認是否皆填值
| is_valid     | 驗證內容是否皆正確
| errors       | 顯示錯誤訊息
| cleaned_data | 取出以驗證後的值

Example: 

```shell
##在shell模式下, 需先引入函式
>>> from database.forms import StudentForm
```

#### (a) Create
```shell
>>> data = {'name':'John', 'grade':60, 'email':'john@email.com'}
>>> student0 = StudentForm(data)
```

Form()函式內的填值格式為Query

#### (b) Check
```shell
>>> data = {'name':'John', 'grade':60, 'email':'emailcom'}
>>> student0 = StudentForm()
>>> student0.is_bound()
False
>>> student0.is_valid()
False

>>> student0 = StudentForm(data)
>>> student0.is_bound()
True
>>> student0.is_valid()
False
>>> student0.errors()
{'email': ['Enter a valid email address.']}
```

#### (c) Read
```shell
>>> data = {'name':'John', 'grade':60, 'email':'john@email.com'}
>>> student0 = StudentForm(data)
>>> student0.is_valid()
True
>>> student0.cleaned_data()
{'name':'John', 'grade':60, 'email':'john@email.com'}
>>> student0.cleaned_data['name']
John
```

注意, 使用cleaned_data前需要先用is_valid驗證過資料

#### 6. 用戶登入系統

以下運用的是django內建的auth用戶應用, 並不會另外去設計一個新的User資料庫, 主要是有現成的工具方便操作, 也可以和內建的後台管理系統共用

#### (1) 增加setting.py設定

```django

INSTALLED_APPS = [
    'django.contrib.auth',
]

MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
]
```

使用內建的應用時, 需先確定在`setting.py`的INSTALLED_APPS內有引入。 此外, 在MIDDLEWARE也順道引入避免CSRF攻擊的防護機制, 也就是避免惡意人士使用Postman或其他程式, 跳過瀏覽器, 直接對網址操作。 如果在開發初期, 需用Postman檢查測試, 也可以先不引用。

不引用CSRF有兩種, 一是把setting.py的CsrfViewMiddleware註解掉, 或是使用裝飾器增加在函式前面
```django
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def function(request):
    ...
```

因`django.contrib.auth`會用到資料庫管理, 因此引用後, 要執行資料庫同步的指令`python manage.py migrate`

#### (2) 註冊帳戶

第一次使用時, 為了能連線進admin後台頁面, 需要先建立一個super user帳號

```shell
python manage.py createsuperuser
```
裡面的欄位有Username、Email address、Password, 其中Email address可不填

#### (3) 增加Django內建後台設定
如果要在官方內建的後台管理系統處理資料, 需先在`mysite/database/admin.py`內註冊要管理的資料庫

```django
from django.contrib import admin
from database.models import Class, Student

admin.site.register(Class)
admin.site.register(Student)
```

#### (4) 撰寫views.py登入功能

以下將介紹如果要自製登入頁面和管理系統時常用的指令, 和提供常用的function樣板

```django
from django.contrib import auth
    
def login(request):
    if request.user.is_authenticated:
        return render(request, "admin.html")
    
    username = request.POST.get('username','')
    password = request.POST.get('password','')
    user = auth.authenticate(username=username, password=password)

    if user is not None and user.is_active:
        auth.login(request, user)
        return render(request, "admin.html")

    return render(request, "login.html")
```

`from django.contrib import auth` 使用用戶管理函式, 需引用library

`auth.authenticate(username='username', password='password')` 建立User物件, 並輸入帳號密碼

`request.user.is_authenticated` 確認發出請求的用戶, 是否已經認證過

`user.is_active` 確認是否為可登入的用戶

`auth.login(request, user)` 用戶登入

`auth.logout(request)` 用戶登出

#### (5) 修改視圖(如果有用到CSRF防護)

如果自製登入頁面需用到CSRF防護, 要在html檔內要傳送資料的`<form>`範圍內, 新增`{% csrf_token %}` template語法, django會在此增加token驗證內容

#### 7. 增加用戶上傳資料資料夾

Django提供了MEDIA功能, 可以讓用戶上傳的檔案放到設定好的資料夾內, 以下說明處理步驟

#### a. 修改setting.py設定
```django
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media") 
```

`MEDIA_URL`：為**DEBUG = TRUE**時, 用戶資源的放置位置。以設定的`/media/`為例, django會將資料庫檔案格式的新增檔案, 儲存到該目錄底下upload_to的位置, 此專案為例, 位置為`mysite/mysite/media`

`MEDIA_ROOT`：為**DEBUG = False**時, 用戶資源的放置位置。以設定的`"media"`為例, 位置為`mysite/mysite/media`

#### b. 修改url.py設定
```django
from django.conf import settings

urlpatterns = [
    ......
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

設定完後, 可在網址後`media/`的位置取用到該資源, 例`http://127.0.0.1/media/`

#### 8. 各坑紀錄
#### (1) request.POST取不到值

request.POST接受的格式為x-www-form-urlencoded且Method為POST, 如格式或Method錯誤, 將不會有任何值。此時可以使用`request.body`確認原始字串格式

#### (2) Method為PUT如何取request值

可以使用`request.body`取得原始字串後, 再做解析。如果request格式為x-www-form-urlencoded, 可使用`QueryDict(request.body)`取得和request.POST相同格式的QueryDict資料

#### (3) 如何輸出JSON格式

`objects.all()`格式為QuerySet且未列出鍵值, `objects.all().values()`格式為QuerySet有列出鍵值但尚無法以string輸出, 以`list(objects.all().values())`轉成list格式後, 就能通過`JsonResponse(內容, safe=False)`輸出

#### (4) ImageField輸出JSON格式無MEDIA_ROOT路徑
`objects.all().values()`輸出的ImageField為`ImageField.name`, 無MEDIA_ROOT路徑, 需要經加工後輸出, 方法如下

```django
values = Student.objects.all().values()
for value in values:
    if value['img'] is not '':
        value['img'] = settings.MEDIA_URL + value['img']
```
#### (5) 安裝Pillow失敗

安裝Pillow時會在下載後當場編譯, 如果docker image是不含編譯函式庫且精簡化的python-slam, 會無法安裝。可以使用含編譯函式庫的python-3.X, 或是用`apt-get install pip3`一併下載編譯函式庫


---

## 四、 SQL資料庫

https://medium.com/@homuchen/%E5%88%A9%E7%94%A8docker%E5%BB%BA%E7%AB%8Bpostgresql%E9%96%8B%E7%99%BC%E7%92%B0%E5%A2%83-5ed41e848c3f

## 五、 Docker虛擬技術

見之前文章
+ [Docker Project on Raspberry Pi](https://github.com/NEXTJun/Build_Docker_at_RaspberryPi)

## 六、 雲端部屬

## 七、 此專案部署方法