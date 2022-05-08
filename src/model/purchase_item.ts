import { ShopItemTypes } from './shop_item_types';

export default interface PurchaseItem {
  itemID: number,
  itemType: ShopItemTypes,
  purchaseDate: number,
  purchaseCost: number,
  discountAmount: number,
}
