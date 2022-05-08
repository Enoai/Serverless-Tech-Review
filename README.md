# Start Up - Serverless-Tech

## Quick Description ##
- This implementation allows you to operate a CRUD ShopList API, that currently has the following lambda available.

      CreateShopItem – A function that allows the user to create a Shop Item by passing in the following JSON params in body, Upon success, it will return the newly created ShopItem.
      getShopItem– A function that allows the user to fetch a SHOP ITEM, via passing in both of the following params to fetch said shop item.
      getAllShopItems– A function that simply when called retrieves ALL shop items in the shop right now and returns them to the user.
      updateShopItem– A function that allows a user to send an update to the DB to update an entry with the supplied updates.
      deleteShopItem– A function that simply deletes a entry from the DB, depending on inputted itemType & ItemID

## START UP ##
    1. Run the following command – “ npm i “
    2. Run the following command – “ npm install -g serverless” ** OPTIONAL – only required if you do not already have it installed”
    Once done, you are now able to start up serverless in offline mode.
    3. Run command – “npm start”
    4. Once completed, you should be displayed the following and are now able to run this API locally, this API comes pre-filled with some seeded data to instantly start working on it / messing around on it.
    5. Once running, you are now also able to run some Jest TESTS via a 2nd command termnial, once open run the following command ---- "npm test"
    
![image](https://user-images.githubusercontent.com/29772947/167320181-c5dab7b9-48a2-42ec-b1f9-ed7d81cfa03b.png)


## POSTMAN EXPORT ##
Please see below a json file ready to be imported into POSTMAN, once imported you are ready to go and able to call function instantly.

PLEASE COPY AND PASTE INTO POSTMAN IMPORT - SELECT RAWTEXT OR MAKE INTO JSON FILE

##
            {
                  "info": {
                        "_postman_id": "7bb8a7ae-d8e7-4a88-9bac-fdf288d98298",
                        "name": "JD-Sports-Serverless-Offline",
                        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
                  },
                  "item": [
                        {
                              "name": "Create Shop Item",
                              "request": {
                                    "method": "POST",
                                    "header": [],
                                    "body": {
                                          "mode": "raw",
                                          "raw": "{\r\n \"itemID\": 999,\r\n \"itemType\": \"Shoes\",\r\n \"title\": \"TestTitle\",\r\n \"description\": \"TestEntry\", \r\n \"price\": 100,\r\n \"availability\": true\r\n}",
                                          "options": {
                                                "raw": {
                                                      "language": "json"
                                                }
                                          }
                                    },
                                    "url": {
                                          "raw": "{{url}}/dev/createShopItem",
                                          "host": [
                                                "{{url}}"
                                          ],
                                          "path": [
                                                "dev",
                                                "createShopItem"
                                          ],
                                          "query": [
                                                {
                                                      "key": "name",
                                                      "value": "dec",
                                                      "disabled": true
                                                }
                                          ]
                                    }
                              },
                              "response": []
                        },
                        {
                              "name": "Get Specific Shop Item",
                              "request": {
                                    "method": "GET",
                                    "header": [],
                                    "url": {
                                          "raw": "{{url}}/dev/getShopItem?itemType=Shoes&itemID=1",
                                          "host": [
                                                "{{url}}"
                                          ],
                                          "path": [
                                                "dev",
                                                "getShopItem"
                                          ],
                                          "query": [
                                                {
                                                      "key": "itemType",
                                                      "value": "Shoes"
                                                },
                                                {
                                                      "key": "itemID",
                                                      "value": "1"
                                                }
                                          ]
                                    }
                              },
                              "response": []
                        },
                        {
                              "name": "Get All Shop Items",
                              "protocolProfileBehavior": {
                                    "disableBodyPruning": true
                              },
                              "request": {
                                    "method": "GET",
                                    "header": [],
                                    "body": {
                                          "mode": "raw",
                                          "raw": "{\r\n    \"userID\": 123\r\n}",
                                          "options": {
                                                "raw": {
                                                      "language": "json"
                                                }
                                          }
                                    },
                                    "url": {
                                          "raw": "{{url}}/dev/getAllShopitems",
                                          "host": [
                                                "{{url}}"
                                          ],
                                          "path": [
                                                "dev",
                                                "getAllShopitems"
                                          ],
                                          "query": [
                                                {
                                                      "key": "name",
                                                      "value": "dec",
                                                      "disabled": true
                                                }
                                          ]
                                    }
                              },
                              "response": []
                        },
                        {
                              "name": "Update Specific Shop Item",
                              "request": {
                                    "method": "PUT",
                                    "header": [],
                                    "body": {
                                          "mode": "raw",
                                          "raw": "{\r\n    \"userID\": 123\r\n}",
                                          "options": {
                                                "raw": {
                                                      "language": "json"
                                                }
                                          }
                                    },
                                    "url": {
                                          "raw": "{{url}}/dev/updateShopItem?itemType=999&itemID=1",
                                          "host": [
                                                "{{url}}"
                                          ],
                                          "path": [
                                                "dev",
                                                "updateShopItem"
                                          ],
                                          "query": [
                                                {
                                                      "key": "itemType",
                                                      "value": "999"
                                                },
                                                {
                                                      "key": "itemID",
                                                      "value": "1"
                                                },
                                                {
                                                      "key": "name",
                                                      "value": "dec",
                                                      "disabled": true
                                                }
                                          ]
                                    }
                              },
                              "response": []
                        },
                        {
                              "name": "Delete Specific Shop item",
                              "request": {
                                    "method": "DELETE",
                                    "header": [],
                                    "body": {
                                          "mode": "raw",
                                          "raw": "{\r\n    \"userID\": 123\r\n}",
                                          "options": {
                                                "raw": {
                                                      "language": "json"
                                                }
                                          }
                                    },
                                    "url": {
                                          "raw": "{{url}}/dev/deleteShopItem?itemType=Shoes&itemID=1",
                                          "host": [
                                                "{{url}}"
                                          ],
                                          "path": [
                                                "dev",
                                                "deleteShopItem"
                                          ],
                                          "query": [
                                                {
                                                      "key": "itemType",
                                                      "value": "Shoes"
                                                },
                                                {
                                                      "key": "itemID",
                                                      "value": "1"
                                                },
                                                {
                                                      "key": "name",
                                                      "value": "dec",
                                                      "disabled": true
                                                }
                                          ]
                                    }
                              },
                              "response": []
                        }
                  ],
                  "variable": [
                        {
                              "key": "url",
                              "value": "http://localhost:3000"
                        }
                  ]
            }
##

## Expanded Explanations ##
## Function (CreateShopItem) ##
 – A function that allows the user to create a Shop Item by passing in the following JSON params in body, Upon success, it will return the newly created ShopItem.

## ALL PARAMS REQUIRED 
    itemID: { type: 'number' },
    itemType: {
      type: ['string'],
      enum: [‘Shoes’, ‘Socks’, ‘Jeans’, ‘Pants’, ‘Shirt’, ‘Short’],
    },
    title: { type: 'string' },
    description: { type: 'string' },
    price: {
      type: 'number',
      minimum: 1,
    },
    salePercent: {
      type: 'number',
      default: 0,
      multipleOf: 10,
      minimum: 0,
      maximum: 100,
    },
    availability: { type: 'boolean' },

#########################################################################
## Function getShopItem ##
– A function that allows the user to fetch a SHOP ITEM, via passing in both of the following params to fetch said shop item.

The params below MUST be passed in via queryStringParameters, to which will retrieve a itemType:jeans with itemID 3
Example – http://localhost:3000/dev/getShopItem?itemType=Jeans&itemID=3


### ALL QUERY STRING PARAMS REQUIRED ###
    itemID: { type: 'number' },
    itemType: {
      type: ['string'],
      enum: [‘Shoes’, ‘Socks’, ‘Jeans’, ‘Pants’, ‘Shirt’, ‘Short’],
    },
#########################################################################

## Function getAllShopItems ##
- A function that simply when called retrieves ALL shop items in the shop right now and returns them to the user.

### NO PARAMS REQUIRED ###
#########################################################################

## Function updateShopItem ##
– A function that allows a user to send an update to the DB to update an entry with the supplied updates.

This function REQUIRES body Params AND queryStringParams also.
Body– Being the parts of the item we want to update.
queryStringParams – Being the location/item we want to update.

The params below MUST be passed in via queryStringParameters, to which will retrieve a itemType:jeans with itemID 3
Example – http://localhost:3000/dev/updateShopItem?itemType=Jeans&itemID=3


### ALL QUERY STRING PARAMS REQUIRED ###
    itemID: { type: 'number' },
    itemType: {
      type: ['string'],
      enum: [‘Shoes’, ‘Socks’, ‘Jeans’, ‘Pants’, ‘Shirt’, ‘Short’],
    },
    
### BODY PARAMS OPTIONAL, BUT REQUIRE AT LEAST ONE ENTRY FROM BELOW ###

    availability: { type: 'boolean' },
    salePercent: {
          type: 'number',
          multipleOf: 10,
          minimum: 0,
          maximum: 100,
        },
    price: {
          type: 'number',
          minimum: 1,
        },
    description: { type: 'string' },
    title: { type: 'string' },

### BODY PARAMS OPTIONAL, BUT REQUIRE AT LEAST ONE ENTRY FROM ABOVE ###

#########################################################################

## Function deleteShopItem ##
- A function that simply deletes a entry from the DB, depending on inputted itemType & ItemID


The params below MUST be passed in via queryStringParameters, to which will Delete a itemType:jeans with itemID 3
Example – http://localhost:3000/dev/deleteShopItem?itemType=Jeans&itemID=3


### ALL QUERY STRING PARAMETERS PARAMS REQUIRED ###
      itemID: { type: 'string' },
       itemType: {
          type: ['string'],
          enum: [‘Shoes’, ‘Socks’, ‘Jeans’, ‘Pants’, ‘Shirt’, ‘Short’],
        }
#########################################################################
