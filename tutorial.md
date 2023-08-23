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
