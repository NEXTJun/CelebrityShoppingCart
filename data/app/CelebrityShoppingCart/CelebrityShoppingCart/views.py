from django.shortcuts import render
from django.contrib import auth

def index(request):
    return render(request, "index.html")

def admin(request):
    if request.user.is_authenticated:
        return render(request, "admin.html")
    
    username = request.POST.get('username','')
    password = request.POST.get('password','')
    user = auth.authenticate(username=username, password=password)

    if user is not None and user.is_active:
        auth.login(request, user)
        return render(request, "admin.html")

    return render(request, "login.html")
