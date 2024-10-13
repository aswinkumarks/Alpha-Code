from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
# from contest.models import Participant
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register(request):
    if request.method == 'POST':
        name1 = request.POST['name1']
        # name2 = request.POST['name2']
        # class1 = request.POST['class1']
        # class2 = request.POST['class2']
        # mno = request.POST['mno']
        # print(name1,name2,class1,class2,mno)
        if not request.user.is_authenticated:
            user = User.objects.create_user(username=name1.lower(),last_name="",password="password")
            user.save()
            userOb = User.objects.get(id=user.id)
            # p = Participant(userId=userOb,p1class=class1,p2class=class2,monitor_num=mno)
            # p = Participant(userId=userOb)
            # p.save()
            user = authenticate(username=name1.lower(),password="password")
            login(request, user)
        return HttpResponseRedirect("contests/")
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})