SHELL := /bin/bash

.PHONY: start-service-1
start-service-1:
	dapr run --app-id service_one --app-port 4000 --dapr-http-port 3500 nx serve service1 # start service 1

.PHONY: start-service-2
start-service-2:
	dapr run --app-id service_two --app-port 4001 --dapr-http-port 3501 nx serve service2 # start service 2
