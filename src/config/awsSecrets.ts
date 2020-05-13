const AWS = require("aws-sdk");

const region = "eu-west-3";
const secretName = "serverless-crm-kbp";

const awsSecretManagerClient = new AWS.SecretsManager({ region });

const request = awsSecretManagerClient.getSecretValue({
  SecretId: secretName,
});
const promise = request.promise();

export async function getSecrets() : Promise<object> {
  const { SecretString } = await promise;
  const secretsObj = JSON.parse(SecretString);
  return secretsObj;
}

// getSecrets();
