"""
ASGI config for AlphaCode project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from task.producer import TaskProducer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AlphaCode.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # Handle HTTP requests
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/task/", TaskProducer.as_asgi()),
                ]
            )
        ),
    }
)
