SHELL := /bin/bash

.PHONY: start-service-1
start-service-1:
	dapr run --app-id service_one --app-port 4000  --app-channel-address localhost --dapr-http-port 3500 nx serve service1 # start service 1
	#dapr run --app-id service_one --app-port 4000 --dapr-http-port 3500 --placement-host-address 127.0.0.1:4000 # start service 1
.PHONY: start-service-2
start-service-2:
	dapr run --app-id service_two --app-port 4001  --app-channel-address localhost --dapr-http-port 3501 nx serve service2 # start service 2
	#dapr run --app-id service_two --app-port 4001 --dapr-http-port 3501 --placement-host-address 127.0.0.1:4001 # start service 2

.PHONY: inextia
inextia:
	dapr run --app-id service-inextia --app-port 8081 --dapr-http-port 3502 --app-channel-address localhost --placement-host-address 127.0.0.1:8081 # placement of inextia ip

.PHONY: upkeep
upkeep:
	dapr run --app-id service-upkeep --app-port 8082 --dapr-http-port 3503 --app-channel-address localhost --placement-host-address 127.0.0.1:8082 # placement of inextia ip

.PHONY: start.pub
start.pub:
	dapr run --app-id publisher --app-port 4002  --app-channel-address localhost --dapr-http-port 3504 --components-path ./components nx serve publisher

.PHONY: start.sub.1
start.sub.1:
	dapr run --app-id subcriber_1 --app-port 4003  --app-channel-address localhost --dapr-http-port 3505 nx serve subscriber-1
