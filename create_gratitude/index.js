'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = async (event, context) => {

    const json = JSON.parse(event.body);
    const gratitudeItem = json.gratitute || 'Nothing There :0';

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          gratitude: gratitudeItem
        },
      };
    
      // write the todo to the database
    const { Item, Error } = await dynamoDb.put(params).promise();
    
    if (Error) {
        return {
            statusCode: 500,
            body: JSON.stringify(Error)
        }
    }



    return {
        statusCode: 200,
        body: JSON.stringify(Item)
    };

};