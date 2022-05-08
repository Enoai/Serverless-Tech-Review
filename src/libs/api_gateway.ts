import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

export const ReturnSuccessResult = (code:number, data: Record<string, unknown>) => ({
  statusCode: code || 200,
  body: JSON.stringify(data),
});

export const ReturnFailureResult = (code:number, failureReason: Record<string, unknown>) => ({
  statusCode: code || 400,
  body: JSON.stringify(failureReason),
});
