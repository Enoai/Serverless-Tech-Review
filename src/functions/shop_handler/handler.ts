import {
  ReturnFailureResult, ReturnSuccessResult, ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api_gateway';
import { middyfy } from '@libs/lambda';
import { validateSchema } from '@libs/schema_validator';
import { CreateShopItem, StoredShopItem } from 'src/model/shop_item';
import ShopService from 'src/service/shop_service';
import ExpandedError from '@libs/expanded_error';
import {
  createShopItemSchema, getAllShopItemsSchema, getShopItemSchema, deleteShopItemSchema, updateShopItemSchemaBody, updateShopItemSchemaqueryStringPara,
} from './schema';

const createShopItemMethod: ValidatedEventAPIGatewayProxyEvent<typeof createShopItemSchema> = async (event) => {
  const newShopItem: CreateShopItem = event.body;
  newShopItem.createdAt = Date.now();
  newShopItem.modifiedAt = Date.now();

  const checkSchema = validateSchema(createShopItemSchema, newShopItem);
  if (checkSchema.success === true) {
    try {
      const createdItem = await new ShopService().createShopItem(newShopItem);
      return ReturnSuccessResult(201, {
        message: 'Succesfully Created ShopItem!',
        result: createdItem,
      });
    } catch (error) {
      if (error instanceof ExpandedError) {
        return ReturnFailureResult(error.statusCode, {
          message: error.message,
          error: {
            name: error.errorName,
            stack: error.stack,
          },
        });
      }
      return ReturnFailureResult(400, {
        message: 'Unsuccessful Create ShopItem!',
        error,
      });
    }
  } else {
    return ReturnFailureResult(400, {
      message: 'Failure to validate schema!',
      error: checkSchema.errors,
    });
  }
};

const getShopItemMethod: ValidatedEventAPIGatewayProxyEvent<typeof getShopItemSchema> = async (event) => {
  try {
    const checkSchema = validateSchema(getShopItemSchema, event);
    if (checkSchema.success === true) {
      const itemType:string = event.queryStringParameters?.itemType || '';
      const itemID:number = Number(event.queryStringParameters?.itemID || -1);

      const shopItem = await new ShopService().getShopItem(
        itemType,
        itemID,
      );

      if (shopItem == null) {
        return ReturnFailureResult(404, {
          message: 'Failure to find shop item!',
        });
      }

      return ReturnSuccessResult(200, {
        message: 'Succesfully Fetched ShopItem!',
        result: shopItem,
      });
    }
    return ReturnFailureResult(400, {
      message: 'Failure to validate schema!',
      errors: checkSchema.errors,
    });
  } catch (error) {
    return ReturnFailureResult(500, {
      message: 'An error occured during getShopItemMethod!',
      error,
    });
  }
};

const getAllShopItemsMethod: ValidatedEventAPIGatewayProxyEvent<typeof getAllShopItemsSchema> = async () => {
  try {
    const shopItems = await new ShopService().getAllShopItems();
    return ReturnSuccessResult(200, {
      message: 'Succesfully Fetched all ShopItems!',
      result: shopItems,
    });
  } catch (error) {
    return ReturnFailureResult(400, {
      message: 'Failure to fetch all ShopItems!',
      error,
    });
  }
};

const deleteShopItemMethod: ValidatedEventAPIGatewayProxyEvent<typeof deleteShopItemSchema> = async (event) => {
  const checkSchema = validateSchema(deleteShopItemSchema, event);
  if (checkSchema.success === true) {
    try {
      const itemType:string = event.queryStringParameters?.itemType || '';
      const itemID:number = Number(event.queryStringParameters?.itemID || -1);

      await new ShopService().deleteShopItem(itemType, itemID);
      return ReturnSuccessResult(200, {
        message: 'Delete ShopItem Success!',
        result: `itemType: ${itemType} with ID: ${itemID} ----> Succesfully deleted.`,
      });
    } catch (error) {
      if (error instanceof ExpandedError) {
        return ReturnFailureResult(error.statusCode, {
          message: error.message,
          error: {
            name: error.errorName,
            stack: error.stack,
          },
        });
      }
      return ReturnFailureResult(400, {
        message: 'Unsuccessful Delete ShopItem!',
        error,
      });
    }
  } else {
    return ReturnFailureResult(400, {
      message: 'Failure to validate schema!',
      errors: checkSchema.errors,
    });
  }
};

const updateShopitemMethod: ValidatedEventAPIGatewayProxyEvent<typeof updateShopItemSchemaBody> = async (event) => {
  const checkSchemaBody = validateSchema(updateShopItemSchemaBody, event.body);
  const checkSchemaQSP = validateSchema(updateShopItemSchemaqueryStringPara, { ...event.queryStringParameters });
  if (checkSchemaBody.success === true && checkSchemaQSP.success === true) {
    try {
      const itemType:string = event.queryStringParameters?.itemType || '';
      const itemID:number = Number(event.queryStringParameters?.itemID || -1);
      const parsedPartial = event.body as Partial<StoredShopItem>;
      const updatedShopItem = await new ShopService().updateShopItem(itemType, itemID, parsedPartial);
      return ReturnSuccessResult(200, {
        message: 'Update ShopItem Success!',
        result: updatedShopItem,
      });
    } catch (error) {
      if (error instanceof ExpandedError) {
        return ReturnFailureResult(error.statusCode, {
          message: error.message,
          error: {
            name: error.errorName,
            stack: error.stack,
          },
        });
      }
      return ReturnFailureResult(400, {
        message: 'Update ShopItem Failure!',
        error,
      });
    }
  } else {
    const bodyErrors = checkSchemaBody.errors || [];
    const qspErrors = checkSchemaQSP.errors || [];
    return ReturnFailureResult(400, {
      message: 'Failure to validate schema!',
      errors: [...bodyErrors, ...qspErrors],
    });
  }
};

export const createShopItem = middyfy(createShopItemMethod);
export const getShopItem = middyfy(getShopItemMethod);
export const getAllShopItems = middyfy(getAllShopItemsMethod);
export const updateShopItem = middyfy(updateShopitemMethod);
export const deleteShopItem = middyfy(deleteShopItemMethod);
