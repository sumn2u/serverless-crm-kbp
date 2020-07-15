import {internalErrorResponse, validResponse} from "../../common/responses";
import {initSettings} from "../../config/getSettings";

export async function parseEvent(event, dependentKeys) {
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda is warm!');
    return validResponse({});
  }
  await initSettings();

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    internalErrorResponse('Invalid JSON');
  }

  dependentKeys.forEach(key => {
    if (!body[key]) throw internalErrorResponse(`missing ${key} in event body`);
  })

  return body;
}