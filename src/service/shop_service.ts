import { StoredShopItem, CreateShopItem } from 'src/model/shop_item';
import dynamoDBClient from '@libs/database/db_client_instance';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { DBTableNames } from 'src/model/db_table_names';
import ExpandedError from '@libs/expanded_error';
import { AWSError } from 'aws-sdk';

export default class ShopService {
  private ShopItemsStorageTableName: string = DBTableNames.ShopItemStorage;

  async createShopItem(itemToPurchase:CreateShopItem): Promise<StoredShopItem> {
    try {
      await dynamoDBClient.put({
        TableName: this.ShopItemsStorageTableName,
        Item: itemToPurchase,
        ExpressionAttributeValues: {
          ':itemType': itemToPurchase.itemType,
          ':itemID': itemToPurchase.itemID,
        },
        ExpressionAttributeNames: {
          '#itemType': 'itemType',
          '#itemID': 'itemID',
        },
        ConditionExpression: '#itemType <> :itemType AND #itemID <> :itemID',
      }).promise();
    } catch (error) {
      const awsError = error as AWSError;
      if (awsError.name === 'ConditionalCheckFailedException') {
        // eslint-disable-next-line max-len
        throw new ExpandedError(`ConditionalCheck Failed - Item with Type:${itemToPurchase.itemType} && ID:${itemToPurchase.itemID}, Already exists`, awsError.name, (awsError.statusCode || 400));
      } else {
        throw new ExpandedError('Unexpected Error - When trying to create shop item', awsError.name, 500);
      }
    }

    return itemToPurchase as StoredShopItem;
  }

  async getShopItem(itemType: string, itemID: number): Promise<StoredShopItem> {
    const gotShopItem = await dynamoDBClient.get({
      TableName: this.ShopItemsStorageTableName,
      Key: {
        itemType,
        itemID,
      },
    }).promise();

    return gotShopItem.Item as StoredShopItem;
  }

  async getAllShopItems(): Promise<StoredShopItem[]> {
    const purchasedItems = await dynamoDBClient.scan({
      TableName: this.ShopItemsStorageTableName,
    }).promise();
    return purchasedItems.Items as StoredShopItem[];
  }

  async updateShopItem(itemType: string, itemID: number, shopItemData: Partial<StoredShopItem>): Promise<StoredShopItem> {
    const expressionAttributeNames: DocumentClient.ExpressionAttributeNameMap = {};
    expressionAttributeNames['#modifiedAt'] = 'modifiedAt';

    const expressionAttributeValues: DocumentClient.ExpressionAttributeValueMap = {};
    expressionAttributeValues[':modifiedAtVal'] = Date.now();

    let updateExpression = 'set #modifiedAt = :modifiedAtVal';

    (Object.keys(shopItemData) as Array<keyof StoredShopItem>).forEach((key) => {
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = shopItemData[key];
      updateExpression += `, #${key} = :${key}`;
    });

    const updateEntryResult = await dynamoDBClient.update({
      TableName: this.ShopItemsStorageTableName,
      Key: { itemType, itemID },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ConditionExpression: 'attribute_exists(itemType) AND attribute_exists(itemID)',
      ReturnValues: 'ALL_NEW',
    }).promise().then((value) => value.Attributes as StoredShopItem).catch((error:AWSError) => {
      if (error.name === 'ConditionalCheckFailedException') {
        // eslint-disable-next-line max-len
        throw new ExpandedError('ConditionalCheck Failed - Item does not exist', error.name, 404);
      } else {
        throw new ExpandedError('Unexpected Error - When trying to create shop item', error.name, 500);
      }
      throw error;
    });

    return updateEntryResult;
  }

  async deleteShopItem(itemType: string, itemID: number): Promise<any> {
    try {
      await dynamoDBClient.delete({
        TableName: this.ShopItemsStorageTableName,
        Key: {
          itemType,
          itemID,
        },
        ConditionExpression: 'attribute_exists(itemType) AND attribute_exists(itemID)',
      }).promise();
    } catch (error) {
      const awsError = error as AWSError;
      if (awsError.name === 'ConditionalCheckFailedException') {
        // eslint-disable-next-line max-len
        throw new ExpandedError('ConditionalCheck Failed - Item does not exist', awsError.name, 404);
      } else {
        throw new ExpandedError('Unexpected Error - When trying to create shop item', awsError.name, 500);
      }
    }
  }
}
