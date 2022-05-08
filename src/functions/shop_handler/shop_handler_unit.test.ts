// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import AWS from 'aws-sdk';
// import AWSMock from 'aws-sdk-mock';
// import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
// import { DocumentClient } from 'aws-sdk/clients/dynamodb';
// import { StoredShopItem } from 'src/model/shop_item';
// import { ShopItemTypes } from 'src/model/shop_item_types';
// import ShopService from 'src/service/shop_service';
// import * as clientDb from '../../model/index';
// import ShopService from 'src/service/ShopService';

// jest.mock('../../model/index.ts', () => ({
//   dynamoDbClient:
// }))

// const test = AWS.DynamoDB.DocumentClient;
// console.log('test', AWS, dynamoDBClient);

// describe('ShopHandler-Service -- Unit Tests', () => {
//   const shopService: ShopService = new ShopService();

//   describe('Get Shop Item -- Unit Test', () => {
//     it('should mock getItem from DynamoDB', async () => {
//       const expectedResult:StoredShopItem = {
//         itemID: 1,
//         itemType: ShopItemTypes.Shoes,
//         title: 'Generic Shoe',
//         price: 10,
//         salePercent: 0,
//         description: 'The most normal shoes in the land',
//         availability: true,
//         createdAt: 1651848557000,
//         modifiedAt: 1651848557000,
//       };
//       await expect(await shopService.getShopItem(ShopItemTypes.Shoes, 1)).toStrictEqual(expectedResult);
//     });
//   });

//   it('should mock getItem from DynamoDB', async () => {
//     // console.log(client);

//     shopService = new ShopService();

//     const mockDbShopItem: StoredShopItem = {
//       itemID: 1,
//       itemType: ShopItemTypes.Shoes,
//       title: 'ASDA TESCO',
//       price: 10,
//       salePercent: 0,
//       description: 'The most normal shoes in the land',
//       availability: true,
//       createdAt: 1651848557000,
//       modifiedAt: 1651848557000,
//     };

//     // jest.mock('aws-sdk', () => ({
//     //   DynamoDb: {
//     //     DocumentClient: jest.fn().mockImplementation(() => ({
//     //       get: () => mockDocumentClient.get,
//     //     })),
//     //   },
//     // }));
//     const mockDocumentClient: DocumentClient = {
//       get: jest.fn().mockImplementation((_, cb) => {
//         cb(null, mockDbShopItem);
//       }),
//       // get: {
//       //   promise: jest.fn().mockReturnValue(Promise.resolve()),
//       // },
//       createSet: jest.fn(),
//       batchGet: jest.fn(),
//       query: jest.fn(),
//       delete: jest.fn(),
//       put: jest.fn(),
//       batchWrite: jest.fn(),
//       scan: jest.fn(),
//       update: jest.fn(),
//       transactGet: jest.fn(),
//       transactWrite: jest.fn(),
//     };

//     // jest.mock('aws-sdk', () => {
//     //   const mDocumentClient = { get: mockDocumentClient.get };
//     //   const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
//     //   return { DynamoDB: mDynamoDB };
//     // });

//     // console.log('CLIENT', clientDb);
//     // @ts-ignore
//     jest.spyOn(clientDb, 'dynamoDBClient').mockImplementation(() => mockDocumentClient);

//     // jest.mock('../../model/index.ts', () => { jest.fn().mockImplementation(() => mockDocumentClient); });

//     // const spy = jest.spyOn(client, 'default');

//     // AWS.DynamoDB.DocumentClient.prototype.get = jest.fn().mockImplementation((_, cb) => {
//     //   cb(null, mockDbShopItem);
//     // });

//     // Overwriting DynamoDB.getItem()
//     // AWSMock.setSDKInstance(AWS);
//     // AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: DocumentClient.GetItemInput, callback: Function) => {
//     //   console.log(`DynamoDB.DocumentClient', 'get', 'mock called -- with params --> ${params}`);
//     //   callback(null, { pk: 'foo', sk: 'bar' });
//     // });

//     // mockDocumentClient.get.promise.mockReturnValueOnce(mockDbShopItem);

//     // const input:DocumentClient.GetItemInput = {
//     //   TableName: 'ShopItemsData',
//     //   Key: {
//     //     itemType: ShopItemTypes.Shoes,
//     //     itemID: 1,
//     //   },
//     // };

//     // const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
//     // const test = await client.get(input).promise();
//     // console.log('TEST OUTPUT ---   ', test);
//     // expect(await client.get(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });
//     await expect(await shopService.getShopItem(ShopItemTypes.Shoes, 1)).toStrictEqual({ pk: 'foo', sk: 'bar' });
//     // await expect(1).toBe(1);

//     // AWSMock.restore('DynamoDB.DocumentClient');

//     // AWSMock.restore('DynamoDB');
//   });

//   // DON'T USE THIS TEST
// });
// }
// });
