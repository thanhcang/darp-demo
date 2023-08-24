1. Start publisher sidecar 
  ```bash
    make start.pub
  ```
2. Start Subscriber 01
- The code is using programmatic  subscriptions. 
- Subscriber 01 service provides an url ``/dapr/subscribe``. 
- When the sidecar of subscriber 01 start, It retrieves all topics on SUB 01. 
- Dapr will register all topics to the pubsub components.
- Notice : Please restart sidecar if register a new topic.
```bash
  make start.sub.1
```

3. Play with example
  - Producing a message for order topic and let check the terminal of SUB 01 service. There is a message, which is process by the ```products``` fnc
  ```bash
    curl --location 'http://localhost:3504/v1.0/publish/order-pub-sub/orders' \
    --header 'Content-Type: application/json' \
    --data '{"orderId": "100"}' 
  ```
- Producing a message for checkout topic and let check the terminal of SUB 01 service. There is a message, which is process by the ```orders``` fnc
  ```bash
    curl --location 'http://localhost:3504/v1.0/publish/order-pub-sub/checkout' \
  --header 'Content-Type: application/json' \
  --data '{"orderId": "100"}'
  ```
