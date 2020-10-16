from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, QueryDict
from django.contrib import auth
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile

import base64
import hashlib

from item_admin.models import Item
from item_admin.forms import CheckItemUpdateForm

# Create your views here.

# URL Interface
@csrf_exempt
def responseItemList(request):
    response = None

    if request.method == 'GET':
        response = readItemList(request)
    if request.method == 'POST':
        response = createItem(request)

    if response is not None:
        return response
        
    return HttpResponse("")

@csrf_exempt
def responseItem(request, id):
    response = None

    if request.method == 'GET':
        response = readItem(request, id)
    elif request.method == 'PUT':
        response = updateItem(request, id)
    elif request.method == 'DELETE':
        response = deleteItem(request, id)

    if response is not None:
        return response

    return HttpResponse("")

# RESTful Function
    # Create
def createItem(request):    
    item = Item.objects.create()
    data = readItem(request, item.id)
    return data

    # Read
def readItemList(request):
    data = getModelQueryJson(Item.objects.all())
    if data is not None:
        return JsonResponse(data, safe=False)
    return JsonResponse([], safe=False) 

def readItem(request, id):
    data = getModelQueryJson(Item.objects.filter(id=id), index=0)
    if data is not None:
        return JsonResponse(data, safe=False)
    return JsonResponse({}, safe=False)

    # Update
def updateItem(request, id):
    parameter = QueryDict(request.body)
    itemlist = Item.objects.filter(id=id)
    if len(itemlist) is not 0 and checkUpdateData(parameter) is True:
        item = itemlist[0]
        item.img = handleBase64Img(parameter.get('imgBase64', None), item.img)
        item.name = parameter.get('name', item.name)
        item.price = parameter.get('price', item.price)
        item.amount = parameter.get('amount', item.amount)
        item.save()
        return readItemList(request)
    return JsonResponse({}, safe=False)

    # Delete
def deleteItem(request, id):
    Item.objects.filter(id=id).delete()[0]
    return readItemList(request)

# Minor Function
def checkUpdateData(data):
    return CheckItemUpdateForm(data).is_valid()

def handleBase64Img(data, raw_data):
    if data is not None:
        split_word = ';base64,'
        if split_word in data:
            # decode base64 data
            format, imgstr = data.split(split_word) 
            ext = format.split('/')[-1]
            img_content = base64.b64decode(imgstr)

            # create file name by hash
            md5_obj = hashlib.md5()
            md5_obj.update(data.encode("utf-8"))
            md5_value = md5_obj.hexdigest()
            file_name = md5_value + '.' + ext
            
            return SimpleUploadedFile(file_name, img_content)
    return raw_data

def getModelQueryJson(data, **kwargs):
    if len(data) is not 0:
        values = handleItemValues(data.values())
        list_obj = list(values)
        if 'index' in kwargs:
            index = kwargs['index']
            return list_obj[index]
        return list_obj
    return None

def handleItemValues(values):   # solve FileField not have media url in values()
    for value in values:
        if value['img'] is not '':
            value['img'] = settings.MEDIA_URL + value['img']
    return values