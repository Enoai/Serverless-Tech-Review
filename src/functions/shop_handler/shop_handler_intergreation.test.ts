import { APIGatewayProxyResult } from 'aws-lambda';
import { ShopItemTypes } from 'src/model/shop_item_types';
import { ProxyEventStub, stubCallBack, stubContext } from 'src/model/aws_event_mock_data/event_mock';
import * as serverResponses from 'src/model/server_responses';
import {
  createShopItem, getShopItem, getAllShopItems, deleteShopItem, updateShopItem,
} from './handler';

describe('CreateShopitem() Intergration Tests', () => {
  const GoodProxyCreateEvent:ProxyEventStub = {
    body: {
      itemID: 123,
      itemType: ShopItemTypes.Shoes,
      title: 'Intergration-Test-Shoe!',
      description: 'This shoe was created during a Intergration test.',
      price: 100,
      availability: true,
    },
  };

  const BadProxyCreateEvent:ProxyEventStub = {
    body: {
      idItem: 123,
      itemType: 4,
      title: 'Intergration-Test-Shoe!',
      description: 'This shoe was created during a Intergration test.',
      price: 100,
      availability: true,
    },
  };

  it('Successful Creation(201) & return valid item ', async () => {
    const response:APIGatewayProxyResult = await createShopItem(GoodProxyCreateEvent, stubContext, stubCallBack);
    const parsed: serverResponses.StoredShopItemParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(parsed.result.itemType).toBe(ShopItemTypes.Shoes);
    expect(parsed.result.itemID).toBe(123);
  });

  it('Failed Creation(400) -- Error of ConditionalCheckFailedException', async () => {
    const response:APIGatewayProxyResult = await createShopItem(GoodProxyCreateEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(parsed.error.name).toBe('ConditionalCheckFailedException');
  });

  it('Failed Creation(400) -- Bad Schema', async () => {
    const response:APIGatewayProxyResult = await createShopItem(BadProxyCreateEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(parsed.message).toBe('Failure to validate schema!');
  });
});

describe('getShopItemMethod() Intergration Tests', () => {
  const GoodProxyGetEvent:ProxyEventStub = {
    queryStringParameters: {
      itemID: '123',
      itemType: ShopItemTypes.Shoes,
    },
  };

  const GoodProxyNoItemGetEvent:ProxyEventStub = {
    queryStringParameters: {
      itemType: ShopItemTypes.Shoes,
      itemID: '55',
    },
  };

  const BadProxyGetEvent:ProxyEventStub = {
    queryStringParameters: {
      itemType: 4,
      idItem: 1,
    },
  };

  it('Successful Get(200) & return valid item ', async () => {
    const response:APIGatewayProxyResult = await getShopItem(GoodProxyGetEvent, stubContext, stubCallBack);
    const parsed: serverResponses.StoredShopItemParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(parsed.result.itemType).toBe(ShopItemTypes.Shoes);
    expect(parsed.result.itemID).toBe(123);
  });

  it('Failed Get(404) -- Error no item found', async () => {
    const response:APIGatewayProxyResult = await getShopItem(GoodProxyNoItemGetEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(404);
    expect(parsed.message).toBe('Failure to find shop item!');
  });

  it('Failed Get(400) -- Bad Schema', async () => {
    const response:APIGatewayProxyResult = await getShopItem(BadProxyGetEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(parsed.message).toBe('Failure to validate schema!');
  });
});

describe('getAllShopItemsMethod() Intergration Tests', () => {
  const ProxyGetEvent:ProxyEventStub = {
    body: {},
  };

  it('Successful GetAll(200) & return a array of items ', async () => {
    const response:APIGatewayProxyResult = await getAllShopItems(ProxyGetEvent, stubContext, stubCallBack);
    const parsed: serverResponses.StoredShopItemArrayParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(parsed.result).toBeTruthy();
    expect(parsed.result.length).toBeGreaterThan(0);
  });
});

describe('updateShopItemMethod() Intergration Test', () => {
  const GoodProxyUpdateEvent:ProxyEventStub = {
    body: {
      price: 1,
      title: 'Snazzy Jeans',
    },
    queryStringParameters: {
      itemID: '123',
      itemType: ShopItemTypes.Shoes,
    },
  };

  const GoodProxyUpdateNoItemEvent:ProxyEventStub = {
    body: {
      price: 1,
      title: 'Snazzy Shoes',
    },
    queryStringParameters: {
      itemType: ShopItemTypes.Jeans,
      itemID: '44',
    },
  };

  const BadProxyUpdateEvent:ProxyEventStub = {
    body: {
      price: '1',
      title: 'Snazzy Shoes',
    },
    queryStringParameters: {
      itemType: ShopItemTypes.Jeans,
      itemID: 1,
    },
  };

  it('Successful Update(200) & return valid item ', async () => {
    const response:APIGatewayProxyResult = await updateShopItem(GoodProxyUpdateEvent, stubContext, stubCallBack);
    const parsed: serverResponses.StoredShopItemParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(parsed.message).toBe('Update ShopItem Success!');
    expect(parsed.result.price).toBe(1);
    expect(parsed.result.title).toBe('Snazzy Jeans');
  });

  it('Failed Update(404) -- Error no item found', async () => {
    const response:APIGatewayProxyResult = await updateShopItem(GoodProxyUpdateNoItemEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(404);
    expect(parsed.message).toBe('ConditionalCheck Failed - Item does not exist');
    expect(parsed.error.name).toBe('ConditionalCheckFailedException');
  });

  it('Failed Update(400) -- Bad Schema', async () => {
    const response:APIGatewayProxyResult = await updateShopItem(BadProxyUpdateEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(parsed.message).toBe('Failure to validate schema!');
  });
});

describe('deleteShopItemMethod() Intergration Tests', () => {
  const GoodProxyDeleteEvent:ProxyEventStub = {
    queryStringParameters: {
      itemID: '123',
      itemType: ShopItemTypes.Shoes,
    },
  };

  const GoodProxyDeleteNoItemEvent:ProxyEventStub = {
    queryStringParameters: {
      itemType: ShopItemTypes.Socks,
      itemID: '55',
    },
  };

  const BadProxyDeleteEvent:ProxyEventStub = {
    queryStringParameters: {
      itemType: 4,
      idItem: 1,
    },
  };

  it('Successful Delete(200) & return valid item ', async () => {
    const response:APIGatewayProxyResult = await deleteShopItem(GoodProxyDeleteEvent, stubContext, stubCallBack);
    const parsed: serverResponses.StoredShopItemParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(parsed.message).toBe('Delete ShopItem Success!');
  });

  it('Failed Delete(404) -- Error no item found', async () => {
    const response:APIGatewayProxyResult = await deleteShopItem(GoodProxyDeleteNoItemEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(404);
    expect(parsed.message).toBe('ConditionalCheck Failed - Item does not exist');
    expect(parsed.error.name).toBe('ConditionalCheckFailedException');
  });

  it('Failed Delete(400) -- Bad Schema', async () => {
    const response:APIGatewayProxyResult = await deleteShopItem(BadProxyDeleteEvent, stubContext, stubCallBack);
    const parsed: serverResponses.FailedErrorParsedBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(parsed.message).toBe('Failure to validate schema!');
  });
});
