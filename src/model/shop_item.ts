import { ShopItemTypes } from './shop_item_types';

interface OptionalShopParamsBase {
  salePercent: number,
  createdAt: number,
  modifiedAt: number,
}

interface StoredShopItemBase {
  itemID: number,
  itemType: ShopItemTypes,
  title: string,
  description: string,
  price: number,
  availability: boolean,
}

type StoredShopItemType = StoredShopItemBase & OptionalShopParamsBase;
interface StoredShopItem extends StoredShopItemType {}

type CreateShopitemType = StoredShopItemBase & Partial<OptionalShopParamsBase>;
interface CreateShopItem extends CreateShopitemType {}

export {
  StoredShopItem,
  CreateShopItem,
};
