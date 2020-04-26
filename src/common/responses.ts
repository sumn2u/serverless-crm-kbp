export const noSuchCustomerResponse = {
  statusCode: 401,
  body: JSON.stringify(
    {
      message: "Not Authorised"
      // input: event,
    },
    null,
    2
  )
};

export const internalErrorResponse = arg => ({
  statusCode: 500,
  body: JSON.stringify(
    {
      message: "General Error",
      error: arg
    },
    null,
    2
  )
});
export const validResponse = (body) => ({
  statusCode: 200,
  body: JSON.stringify(body, null, 2),
});