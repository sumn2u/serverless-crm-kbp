import AWS from "aws-sdk";

import * as orders from "../apis/priority/orders";
import {
  internalErrorResponse,
  validResponse,
  Item,
} from "../common/responses";
import { getOrderById, IWpItem, IWpOrder } from "../apis/wordpress/getOrder";
import * as auth0 from "../apis/auth0/management";
import { initSettings } from "../config/getSettings";

const queueName = "NewOrders";
const region = "eu-west-3";
let sqsBase = `https://sqs.${region}.amazonaws.com`;
const sqs = new AWS.SQS({ region });

export async function createAsync(event, context) {
  await initSettings();
  let body = JSON.parse(event.body);
  if (!body.order_id) return internalErrorResponse("Missing order_id on body");

  const accountId = context.invokedFunctionArn.split(":")[4];

  const queueUrl = `${sqsBase}/${accountId}/${queueName}`;

  let responseBody = {
    message: "",
  };
  let responseCode = 200;

  // SQS message parameters
  const params = {
    MessageBody: event.body,
    QueueUrl: queueUrl,
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('error:', "failed to send message" + err);
      return internalErrorResponse(err);
    } else {
      console.log('data:', data.MessageId);
      return validResponse({});
    }

  });
}
