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