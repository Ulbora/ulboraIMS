GET: http://localhost:8080/rs/test

res:

[{"code":2,"name":"ken"},{"name":"wine2"}]


 * products

---------------------------------------

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


 * users
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

-------------------------------------------------

 * address

POST: http://localhost:8080/rs/address

req:

{
"address": "some street",
"city": "atlanta",
"state": "ga",
"country": "usa",
"zip": "32255",
"zipExt": "4444"
}

res:

{"success":true,"message":""}


-------------------------------------

PUT: http://localhost:8080/rs/address

req:

{
"id": "54fc75c63bab983314d09bba",
"address": "some street",
"city": "atlanta",
"state": "ga",
"country": "usa",
"zip": "32255",
"zipExt": "4444"
}

res:

{"success":true,"message":""}

----------------------------------------

GET: http://localhost:8080/rs/address/54fc75c63bab983314d09bba

res:

{  
   "__v":0,
   "_id":"54fc75c63bab983314d09bba",
   "address":"some street on",
   "city":"atlanta",
   "country":"usa",
   "state":"ga",
   "user":"54fba6f4c78a41792a185b73",
   "zip":"32255",
   "zipExt":"4444"
}

----------------------------------------------

DELETE: http://localhost:8080/rs/address/54fc75c63bab983314d09bba

res:

{"success":true,"message":""}



---------------------------------------

POST: http://localhost:8080/rs/address/list

res:

[  
   {  
      "address":"some street",
      "city":"atlanta",
      "state":"ga",
      "country":"usa",
      "zip":"32255",
      "zipExt":"4444",
      "user":"54fba6f4c78a41792a185b73",
      "_id":"54fc79989e6cd0a8146ec80c",
      "__v":0
   },
   {  
      "address":"some street",
      "city":"atlanta",
      "state":"ga",
      "country":"usa",
      "zip":"32255",
      "zipExt":"4444",
      "user":"54fba6f4c78a41792a185b73",
      "_id":"54fc799b9e6cd0a8146ec80d",
      "__v":0
   },
   {  
      "address":"some street",
      "city":"atlanta",
      "state":"ga",
      "country":"usa",
      "zip":"32255",
      "zipExt":"4444",
      "user":"54fba6f4c78a41792a185b73",
      "_id":"54fc799c9e6cd0a8146ec80e",
      "__v":0
   }
]

 * order
------------------------------------------------

POST: http://localhost:8080/rs/order

req:

{  
   "shippingAddress":"54fc79989e6cd0a8146ec80c",
   "billingAddress":"54fc79989e6cd0a8146ec80c",
   "items":[  
      {  
         "product":"54fba2006a030ea92917b5ef",
         "count":"2"
      },
      {  
         "product":"54fba2006a030ea92917b5ef",
         "count":"2"
      }
   ]
}

res:

{"success":true,"message":""}


----------------------------------

PUT: http://localhost:8080/rs/order

req:

{  
  "id": "54fc882305467bff15c8fbb7",
   "shippingAddress":"54fc79989e6cd0a8146ec80c",
   "billingAddress":"54fc79989e6cd0a8146ec80c",  
  "deliveryDate": "3/10/2015"
}

res:

{"success":true,"message":""}



------------------------------------------

GET: http://localhost:8080/rs/order/54fc882305467bff15c8fbb7

res:



    {
       "__v": 0,
       "_id": "54fc882305467bff15c8fbb7",
       "billingAddress": "54fc79989e6cd0a8146ec80c",
       "deliveryDate": "2015-03-10T04:00:00.000Z",
       "shippingAddress": "54fc79989e6cd0a8146ec80c",
       "user": "54fba6f4c78a41792a185b73",
       "orderDate": "2015-03-08T17:34:27.326Z"
    }


--------------------------------------------------

DELETE: http://localhost:8080/rs/order/54fc882305467bff15c8fbb7

res:

{"success":true,"message":""}



---------------------------------------------


POST: http://localhost:8080/rs/order/list

res:

[  
   {  
      "shippingAddress":"54fc79989e6cd0a8146ec80c",
      "billingAddress":"54fc79989e6cd0a8146ec80c",
      "user":"54fba6f4c78a41792a185b73",
      "_id":"54fc882305467bff15c8fbb7",
      "__v":0,
      "orderDate":"2015-03-08T17:34:27.326Z"
   }
]




 * orderItems

-------------------------------------




