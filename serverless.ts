import type { AWS } from '@serverless/typescript';
import * as importedFuncs from 'src/functions/index';

const serverlessConfiguration: AWS = {
  service: 'serverless-techreview',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1', // Don't forget to set this -- By default this is US-EAST-2
    apiGateway: {
      minimumCompressionSize: 1024, // sets the api-gateway default memory usage across the board in (MB)
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1', // keeps alive TCP connections
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      IS_OFFLINE_MODE: '1', // 1 = offline --- 0 = online(aws)
    },
    iam: { // Limits what these lambda's can do.
      role: {
        statements: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
          ],
          Resource: 'arn:aws:dynamodb:eu-west-1:*:table/ShopItemsData',
        }],
      },
    },
  },
  // import the function via paths
  functions: importedFuncs,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
        seed: true,
      },
      seed: { // seeds data into the table depending on source.
        domain: {
          sources: {
            table: 'ShopItemsData',
            sources: ['src/libs/database/db_seed_data/shop_item_seed_data.json'],
          },
        },
      },
      stages: 'dev',
    },
  },
  resources: {
    Resources: {
      ShopItemsData: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'ShopItemsData',
          AttributeDefinitions: [
            {
              AttributeName: 'itemType',
              AttributeType: 'S',
            },
            {
              AttributeName: 'itemID',
              AttributeType: 'N',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'itemType',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'itemID',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },

        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
