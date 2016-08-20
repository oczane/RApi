# RApi
RESTfull API using Basic Auth

# Application setup

1. npm install
2. node app OR npm start (starts app in the production mode)

# Production deployment requirements

1. install nvm and install node 4.5.0
2. clone git repository https://github.com/oczane/RApi.git
3. install forever and use
  ```
  forever start app.js 

  ```
4. install nginx (sudo apt-get install nginx)
5. sudo vi /etc/nginx/sites-available/default and made below changes.

```

server {
listen <your port>;

server_name <domain or ip address>;

location / {
    proxy_pass http://APP_PRIVATE_IP_ADDRESS:<port number>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
}

```

6. sudo service nginx restart


# Using Endpoint

Basic auth

1. Username: rakesh
2. Password: Rakesh@@123


Header

Content-Type: application/json

#Post request

Url - http://APP_IP_ADDRESS_OR_DOMAIN_NAME/v1/api/doc
Verb - POST

Request body

{
  "jsondocument": "{\"employees\":[{\"firstName\":\"John\", \"lastName\":\"Doe\"},{\"firstName\":\"Anna\", \"lastName\":\"Smith\"},{\"firstName\":\"Peter\", \"lastName\":\"Jones\"}]}"
}

{

	"msg": "Document saved successfully.",

	"documentUrl": "http://APP_IP_ADDRESS_OR_DOMAIN_NAME/v1/api/doc/57b83b2ad68c519d547b911a"

}

#Get request

Url - http://APP_IP_ADDRESS_OR_DOMAIN_NAME/v1/api/doc/57b83b2ad68c519d547b911a

Verb - GET
