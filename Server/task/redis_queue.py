import json
from uuid import uuid4
from datetime import datetime

from redis import asyncio as aioredis

# pool = aioredis.ConnectionPool(host="localhost", port=6379, db=0, max_connections=10)


class RedisQueue:
    def __init__(self):
        self.redis_conn = aioredis.Redis()

    async def add_task(self, session_id: str, data):
        task_id = str(uuid4())
        meta = {
            "creationTime": datetime.now().isoformat(),
            "sessionId": session_id,
            "taskId": task_id,
        }
        content = {
            "meta": meta,
            "data": data,
        }
        await self.redis_conn.rpush("Waiting", json.dumps(content))
        return task_id

    async def get_result(self, task_id):
        pubsub = self.redis_conn.pubsub()
        await pubsub.subscribe(f"task:{task_id}")
        async for message in pubsub.listen():
            if message["type"] == "message":
                result = message["data"].decode("utf-8")
                await pubsub.unsubscribe(f"task:{task_id}")
                print("Received result", result)
                return result
