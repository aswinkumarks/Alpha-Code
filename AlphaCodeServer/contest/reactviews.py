from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import *
import json
from django.contrib.auth.decorators import login_required
from datetime import datetime
import datetime as dt
from django.views.decorators.csrf import csrf_exempt
from .evaluate import evaluateSubmission
from .evaluate import getParticipantScore
from .extra_scripts import *
from .db_handler import *
from rest_framework import viewsets
from .serializers import ContestSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view



class ContestView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()

class CreateContest(viewsets.ModelViewSet): 
    # getting error 401 unauthorized with below line
    # permission_classes = (IsAuthenticated,)

    serializer_class = ContestSerializer
    print("in CreateContest class")
    
    def post(self, request):
        print("in CreateContest post")
        print(request.data)
        serializer = ContestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("success", status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # res = save_new_contest_info(request.POST)
    # if not res:
    #     return HttpResponse("ERROR : Contest Name already in use. Please choose a different one.")

# @api_view(['GET', 'POST'])
# def create_contest2(request):

#     # if request.method == 'GET':
#     #     snippets = Snippet.objects.all()
#     #     serializer = SnippetSerializer(snippets, many=True)
#     #     return Response(serializer.data)

#     if request.method == 'POST':
#         print(request.data)
#         serializer = ContestSerializer(data=request.data)
#         if serializer.is_valid():
#             # serializer.save()
#             return Response("success", status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    