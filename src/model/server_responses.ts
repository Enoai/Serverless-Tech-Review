import { StoredShopItem } from './shop_item';

export type StoredShopItemParsedBody = {
  message: string,
  result: StoredShopItem
};

export type StoredShopItemArrayParsedBody = {
  message: string,
  result: StoredShopItem[]
};

export type FailedErrorParsedBody = {
  message: string,
  error: {
    name: string,
    stack: string,
  },
};
