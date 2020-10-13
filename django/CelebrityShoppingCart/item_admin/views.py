from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, QueryDict
from django.contrib import auth
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import base64
import hashlib

from item_admin.models import Item

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
    item = Item.objects.create(name='', imgUrl='')
    data = readItem(request, item.id)
    return data

    # Read
def readItemList(request):
    itemlist = list(Item.objects.all().values())
    if len(itemlist) is not 0:
        return JsonResponse(itemlist, safe=False)
    return JsonResponse([], safe=False) 

def readItem(request, id):
    itemlist = list(Item.objects.filter(id=id).values())
    if len(itemlist) is not 0:
        item = itemlist[0]
        return JsonResponse(item, safe=False)
    return JsonResponse({}, safe=False)

    # Update
def updateItem(request, id):
    parameter = QueryDict(request.body)
    datalist = Item.objects.filter(id=id)
    if len(datalist) is not 0:
        data = datalist[0]

        img_data = parameter.get('imgBase64', None)
        if img_data is not None:
            data.imgUrl = handleBase64Img(img_data)
            
        data.name = parameter.get('name', data.name)
        data.price = parameter.get('price', data.price)
        data.amount = parameter.get('amount', data.amount)
        data.save()
        item = list(datalist.values())[0]
        return JsonResponse(item, safe=False) 
    return JsonResponse({}, safe=False)

    # Delete
def deleteItem(request, id):
    if Item.objects.filter(id=id).delete()[0] is not 0:     # number of deletions 
        return HttpResponse("OK")
    return HttpResponse("")

# Minor Function
def handleBase64Img(data):
    # decode base64 data
    format, imgstr = data.split(';base64,') 
    ext = format.split('/')[-1]
    img_content = base64.b64decode(imgstr)

    # create file name by hash
    md5_obj = hashlib.md5()
    md5_obj.update(data.encode("utf-8"))
    md5_value = md5_obj.hexdigest()
    file_path = 'img/' + md5_value + '.' + ext

    # save file
    path = default_storage.save(file_path, ContentFile(img_content))
    path = settings.MEDIA_URL + path
    return path