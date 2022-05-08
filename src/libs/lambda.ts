import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { Context, Callback } from 'aws-lambda';

// eslint-disable-next-line max-len
export const middyfy = (handler: ((event: any, context: Context, callback: Callback<any>) => void | Promise<any>) | undefined) => middy(handler).use(middyJsonBodyParser());
