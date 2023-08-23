### Prerequisites
 - installing nx : ``npm install -g nx``
 - installing the DAPR cli in [link](https://docs.dapr.io/getting-started/install-dapr-cli)

### 
 1. Create a work space which is called project
    ```bash
       npx create-nx-workspace project
       nx grahp # view the architecture of the project by graph
    ```
 2. Generate library/services
    ```bash 
        nx generate @nrwl/workspace:lib shared-lib
        nx generate @nrwl/node:app service1
        nx generate @nrwl/node:app service2
        npx nx generate @nx/js:library darp  --importPath @project/darp # example generate the library
    ```
 3. starting apps
    ```bash
        nx serve service1
        nx serve service2
    ``` 
4. Working with darp
    - documentation : [link](https://docs.dapr.io/getting-started/get-started-api/)
    - start a app
    ```bash
        dapr run --app-id myapp --dapr-http-port 3500 # checking dapr ready
    ```
    - register app for service 1   
    ```bash
        dapr run --app-id myapp --app-port 4000 --dapr-http-port 3500 nx serve service1 # start service 1
        http://localhost:3500/v1.0/invoke/http://localhost:4000/method/test # none dapr endpoint
    ```
   
    ```bash
        dapr dashboard # a dashboard shows all the services and component.
        ls $HOME/.dapr # check dapr's configurations
    ```
    - url of dashboard : http://localhost:8080
    - when run the app, it uses redis to store the state. 
    ```bash
      docker exec -it dapr_redis redis-cli # connect to docker container
      key* # view all the states 
    ```
5. Some utils command 
```bash
  - lsof -i :4000 # check what is service using the specified port
  - kill 82044 # Kill pid
```
6. command usage
   ```bash
    Usage:
     dapr run [flags]

    Examples:

    # Run a .NET application
    dapr run --app-id myapp --app-port 5000 -- dotnet run

    # Run a Java application
    dapr run --app-id myapp -- java -jar myapp.jar

    # Run a NodeJs application that listens to port 3000
    dapr run --app-id myapp --app-port 3000 -- node myapp.js

    # Run a Python application
    dapr run --app-id myapp -- python myapp.py

    # Run sidecar only
    dapr run --app-id myapp

    # Run a gRPC application written in Go (listening on port 3000)
    dapr run --app-id myapp --app-port 3000 --app-protocol grpc -- go run main.go

    # Run a gRPC application written in Go (listening on port 3000) with a different app channel address
    dapr run --app-id myapp --app-port 3000 --app-channel-address localhost --app-protocol grpc -- go run main.go


    # Run sidecar only specifying dapr runtime installation directory
    dapr run --app-id myapp --runtime-path /usr/local/dapr

    # Run multiple apps by providing path of a run config file
    dapr run --run-file dapr.yaml

    # Run multiple apps by providing a directory path containing the run config file(dapr.yaml)
    dapr run --run-file /path/to/directory


    Flags:
        --app-channel-address string       The network address the application listens on (default "127.0.0.1")
        --app-health-check-path string     Path used for health checks; HTTP only
        --app-health-probe-interval int    Interval to probe for the health of the app in seconds
        --app-health-probe-timeout int     Timeout for app health probes in milliseconds
        --app-health-threshold int         Number of consecutive failures for the app to be considered unhealthy
    -a, --app-id string                    The id for your application, used for service discovery
        --app-max-concurrency int          The concurrency level of the application, otherwise is unlimited (default -1)
    -p, --app-port int                     The port your application is listening on (default -1)
    -P, --app-protocol string              The protocol (grpc, grpcs, http, https, h2c) Dapr uses to talk to the application (default "http")
    -c, --config string                    Dapr configuration file
    -G, --dapr-grpc-port int               The gRPC port for Dapr to listen on (default -1)
        --dapr-http-max-request-size int   Max size of request body in MB (default -1)
    -H, --dapr-http-port int               The HTTP port for Dapr to listen on (default -1)
        --dapr-http-read-buffer-size int   HTTP header read buffer in KB (default -1)
    -I, --dapr-internal-grpc-port int      The gRPC port for the Dapr internal API to listen on (default -1)
        --dapr-listen-addresses string     Comma separated list of IP addresses that sidecar will listen to
        --enable-api-logging               Log API calls at INFO verbosity. Valid values are: true or false
        --enable-app-health-check          Enable health checks for the application using the protocol defined with app-protocol
        --enable-profiling                 Enable pprof profiling via an HTTP endpoint
    -h, --help                             Print this help message
        --log-level string                 The log verbosity. Valid values are: debug, info, warn, error, fatal, or panic (default "info")
    -M, --metrics-port int                 The port of metrics on dapr (default -1)
        --placement-host-address string    The address of the placement service. Format is either <hostname> for default port or <hostname>:<port> for custom port (default "localhost")
        --profile-port int                 The port for the profile server to listen on (default -1)
        --resources-path strings           The path for resources directory
    -f, --run-file string                  Path to the run template file for the list of apps to run
    -u, --unix-domain-socket string        Path to a unix domain socket dir. If specified, Dapr API servers will use Unix Domain Sockets

    Global Flags:
        --log-as-json           Log output in JSON format
        --runtime-path string   The path to the dapr runtime installation directory
   ```