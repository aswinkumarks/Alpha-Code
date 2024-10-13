import json
from datetime import datetime

import redis

pool = redis.ConnectionPool(host="localhost", port=6379, db=0, max_connections=10)


class RedisQueue:
    def __init__(self):
        self.redis_conn = redis.Redis(connection_pool=pool)

    def push(self, message):
        content = {"creationTime": datetime.now(), "message": message}
        self.redis_conn.rpush("main", json.dumps(content))
    
    
