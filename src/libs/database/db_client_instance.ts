import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

/**
 * Sets up a connection to dynamoDB
 * Depending upon enviroment variable - local_offline
 * It will point at our local dynamoDB table OR public one.
 *
 * @returns {DocumentClient} - Returns active connection to our databases.
 */
const dynamoDBClient = (): DocumentClient => {
  // if (process.env.LOCAL_OFFLINE) {
  if (true) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:5000',
    });
  }

  return new AWS.DynamoDB.DocumentClient({});
};

const client = dynamoDBClient();

export default client;
