GET: http://localhost:8080/rs/test

res:

[{"code":2,"name":"ken"},{"name":"wine2"}]


products---------------------------------------:
POST: http://localhost:8080/rs/product/list
res:
[  
   {  
      "name":"test",
      "desc":"desc",
      "currencyCode":"USD",
      "price":11.22,
      "_id":"54fba2006a030ea92917b5ef",
      "__v":0,
      "published":false
   },
   {  
      "name":"test1",
      "desc":"desc",
      "currencyCode":"USD",
      "price":11.22,
      "_id":"54fba26d6a030ea92917b5f0",
      "__v":0,
      "published":false
   }
]


-------------------------------------
POST: http://localhost:8080/rs/product
req:
{
"name": "test",
"desc": "desc",
"currencyCode": "USD",
"price": 11.22
}
res:

    {
       "success": true,
       "message": ""
    }
------------------------------------
PUT: http://localhost:8080/rs/product
req:
{  
      "name":"test",
      "desc":"desc",
      "currencyCode":"USD",
      "price":11.22,
      "id":"54fba2006a030ea92917b5ef",
      "__v":0,
      "published":true
   }

res:


    {
       "success": true,
       "message": ""
    }
----------------------------------------
GET: http://localhost:8080/rs/product/54fba2006a030ea92917b5ef
res:
    {
       "name": "test",
       "desc": "desc",
       "currencyCode": "USD",
       "price": 11.22,
       "_id": "54fba2006a030ea92917b5ef",
       "__v": 0,
       "published": true
    }

DELETE: http://localhost:8080/rs/product/54fba2006a030ea92917b5ef
res:
{"success":true,"message":""}

----------------------------
POST: http://localhost:8080/rs/user
req:
{
"firstName": "ken",
"lastName": "will",
"emailAddress": "444@333.com",
"username": "ken",
"password": "password"
}
res:
{"success":true,"message":""}

----------------------------
PUT: http://localhost:8080/rs/user
req:
{
"id": "54fba6f4c78a41792a185b73",
"firstName": "ken",
"lastName": "will",
"emailAddress": "ken@333.com",
"username": "ken",
"password": ""
}
res:
{"success":true,"message":""}

-------------------------------
GET: http://localhost:8080/rs/user/54fba6f4c78a41792a185b73
res:
{
       "firstName": "ken",
       "lastName": "will",
       "emailAddress": "ken@333.com",
       "username": "ken",
       "password": "",
       "_id": "54fba6f4c78a41792a185b73",
       "__v": 0
    }
   
----------------------------
POST: http://localhost:8080/rs/user/list
res:
    [
       {
           "firstName": "ken",
           "lastName": "will",
           "emailAddress": "ken@333.com",
           "username": "ken",
           "password": "",
           "_id": "54fba6f4c78a41792a185b73",
           "__v": 0
       }
    ]






