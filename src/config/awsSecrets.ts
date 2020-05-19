const AWS = require("aws-sdk");

const region = "eu-west-3";
const secretName = "serverless-crm-kbp";

const awsSecretManagerClient = new AWS.SecretsManager({ region });

const request = awsSecretManagerClient.getSecretValue({
  SecretId: secretName,
});
const promise = request.promise();

export async function getSecrets(): Promise<object> {
  return promise
    .then(({ SecretString }) => {
      const secretsObj = JSON.parse(SecretString);
      return secretsObj;
    })
    .catch((error) => {
      console.error("failed to fetch aws secrets", error);
      return {};
    });
}

// getSecrets();
