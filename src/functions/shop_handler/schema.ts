import { ShopItemTypes } from 'src/model/shop_item_types';

export const createShopItemSchema = {
  type: 'object',
  properties: {
    itemID: { type: 'number' },
    itemType: {
      type: ['string'],
      enum: Object.values(ShopItemTypes),
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
  },
  required: ['itemID', 'itemType', 'title', 'description', 'price', 'availability'],
} as const;

export const getShopItemSchema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        itemID: { type: 'string' },
        itemType: {
          type: ['string'],
          enum: Object.values(ShopItemTypes),
        },
      },
      required: ['itemID', 'itemType'],
    },
  },
} as const;

export const getAllShopItemsSchema = {} as const;

export const updateShopItemSchemaBody = {
  type: 'object',
  anyOf: [
    {
      properties: {
        title: { type: 'string' },
      },
      required: ['title'],
    },
    {
      properties: {
        description: { type: 'string' },
      },
      required: ['description'],
    },
    {
      properties: {
        price: {
          type: 'number',
          minimum: 1,
        },
      },

      required: ['price'],
    },
    {
      properties: {
        salePercent: {
          type: 'number',
          multipleOf: 10,
          minimum: 0,
          maximum: 100,
        },
      },
      required: ['salePercent'],
    },
    {
      properties: {
        availability: { type: 'boolean' },
      },
      required: ['availability'],
    },
  ],
} as const;

export const updateShopItemSchemaqueryStringPara = {
  type: 'object',
  properties: {
    itemID: { type: 'string' },
    itemType: {
      type: ['string'],
      enum: Object.values(ShopItemTypes),
    },
  },
  required: ['itemID', 'itemType'],
} as const;

export const deleteShopItemSchema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        itemID: { type: 'string' },
        itemType: {
          type: ['string'],
          enum: Object.values(ShopItemTypes),
        },
      },
      required: ['itemID', 'itemType'],
    },
  },
} as const;
