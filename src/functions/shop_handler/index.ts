import { handlerPath } from '@libs/handler_resolver';
import {
  createShopItemSchema, /* getAllShopItemsSchema ,  getShopItemSchema, */ deleteShopItemSchema, updateShopItemSchemaBody,
} from './schema';

export const createShopItem = {
  handler: `${handlerPath(__dirname)}/handler.createShopItem`,
  memorySize: 1024,
  events: [
    {
      http: {
        method: 'post',
        path: 'createShopItem',
        request: {
          schemas: {
            'application/json': createShopItemSchema,
          },
        },
      },
    },
  ],
};

export const getAllShopItems = {
  handler: `${handlerPath(__dirname)}/handler.getAllShopItems`,
  memorySize: 1024,
  events: [
    {
      http: {
        method: 'get',
        path: 'getAllShopitems',
      },
    },
  ],
};

export const getShopItem = {
  handler: `${handlerPath(__dirname)}/handler.getShopItem`,
  memorySize: 1024,
  events: [
    {
      http: {
        method: 'get',
        path: 'getShopItem',
      },
    },
  ],
};

export const updateShopItem = {
  handler: `${handlerPath(__dirname)}/handler.updateShopItem`,
  memorySize: 1024,
  events: [
    {
      http: {
        method: 'put',
        path: 'updateShopItem',
        request: {
          schemas: {
            'application/json': updateShopItemSchemaBody,
          },
        },
      },
    },
  ],
};

export const deleteShopItem = {
  handler: `${handlerPath(__dirname)}/handler.deleteShopItem`,
  memorySize: 1024,
  events: [
    {
      http: {
        method: 'delete',
        path: 'deleteShopItem',
        request: {
          schemas: {
            'application/json': deleteShopItemSchema,
          },
        },
      },
    },
  ],
};
