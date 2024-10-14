# myapp/consumers.py

from uuid import uuid4
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.exceptions import DenyConnection
from asgiref.sync import sync_to_async
from urllib.parse import parse_qs

from user.utils import authenticate_token
from .redis_queue import RedisQueue


class TaskProducer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        """Accept the WebSocket connection."""

        query_string = self.scope["query_string"].decode()
        query_params = parse_qs(query_string)
        token_key = query_params.get('token', [''])[0]
        user = await sync_to_async(authenticate_token)(token_key)
        if not user:
            # Use header auth when query param auth fails
            user = self.scope["user"]

        if not user.is_authenticated:
            print("Unauthorized WebSocket connection attempt.")
            raise DenyConnection("User not authenticated")

        await self.accept()
        self.session_id = str(uuid4())
        self.queue = RedisQueue()

    async def receive_json(self, content):
        """Receive message from WebSocket and push to Redis queue."""
        # data = json.loads(text_data)
        # task_message = data.get("task", "default task")

        # Push the task to Redis queue
        task_id = await self.queue.add_task(self.session_id, content)

        print(f"WebSocket data: {content}")
        # Send confirmation back to WebSocket client
        await self.send_json(
            {"status": "Task added", "sessionId": self.session_id, "taskId": task_id}
        )

        result = await self.queue.get_result(task_id)
        await self.send_json(
            {
                "status": "Task completed",
                "sessionId": self.session_id,
                "taskId": task_id,
                "result": result,
            }
        )

    async def disconnect(self, close_code):
        """Handle WebSocket disconnection."""
        print(f"WebSocket disconnected with code: {close_code}")
