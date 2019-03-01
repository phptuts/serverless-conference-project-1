'use strict';

const loremIpsum = require('lorem-ipsum');
// Outside the function gets cached

module.exports.hello = async (event, context) => {

  // Inside the function does not
  const output = loremIpsum();

  let body;
  if (event.body) {
    body = JSON.parse(body);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: output,
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
