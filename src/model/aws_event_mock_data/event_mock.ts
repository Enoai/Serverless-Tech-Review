import { Callback, Context } from 'aws-lambda';

export const stubContext:Context = {
  awsRequestId: 'cl2w21hwg000280tu19ws93r0',
  callbackWaitsForEmptyEventLoop: true,
  clientContext: undefined,
  functionName: 'serverless-techreview-dev-createShopItem',
  functionVersion: '$LATEST',
  identity: undefined,
  invokedFunctionArn: 'offline_invokedFunctionArn_for_serverless-techreview-dev-createShopItem',
  logGroupName: 'offline_logGroupName_for_serverless-techreview-dev-createShopItem',
  logStreamName: 'offline_logStreamName_for_serverless-techreview-dev-createShopItem',
  memoryLimitInMB: '1024',
  getRemainingTimeInMillis: function timeStub() {
    return 1;
  },
  done: function doneStub() {
    return true;
  },
  fail: function doneStub() {
    return true;
  },
  succeed: function doneStub() {
    return true;
  },
};

export const stubCallBack:Callback = function stubCallBackmethod() {
  return true;
};

export type ProxyEventStub = {
  body?: {},
  pathParameters?: {},
  queryStringParameters?: {},
  multiValueQueryStringParameters?: {},
};
