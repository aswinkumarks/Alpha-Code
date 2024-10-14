from redis import asyncio as aioredis
import asyncio
import json
from datetime import datetime

# Redis configuration
REDIS_HOST = "127.0.0.1"
REDIS_PORT = 6379


async def process_task(redis: aioredis.Redis, task):
    """Simulate async processing of a task."""
    await asyncio.sleep(1)  # Simulate I/O-bound work

    task_id = task.get("meta", {}).get("taskId")
    print(f"Processing task: {task_id}")
    if task_id is None:
        raise Exception("Task processing failed!")

    await redis.publish(f"task:{task_id}", "Completed")


async def consume_tasks():
    """Continuously consume tasks from Redis."""

    redis = aioredis.from_url(
        f"redis://{REDIS_HOST}:{REDIS_PORT}", decode_responses=True
    )
    print(f"Connected to Redis. Listening on queue 'Waiting'...")

    while True:
        _, task_data = await redis.blpop("Waiting")
        if task_data:
            data = json.loads(task_data)
            meta_data = data.get("meta", {})
            meta_data["startTime"] = datetime.now().isoformat()
            data["meta"] = meta_data
            task_id = meta_data.get("taskId")
            data_str = json.dumps(data)
            await redis.rpush("Processing", data_str)
            await process_task(redis, data)
            await redis.lrem("Processing", 1, data_str)
            print(f"Successfully processed: {task_id}")
        else:
            print("No tasks in the queue. Waiting...")


async def main():
    await consume_tasks()


if __name__ == "__main__":
    asyncio.run(main())
