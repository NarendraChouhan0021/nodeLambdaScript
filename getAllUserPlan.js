import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllUserPlan = async (event, context, callback) => {
    let email = decodeURI(event.pathParameters.email);

    try {
        const params = {
            TableName: 'dev-Plans',
            IndexName: 'emailIndex',
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: { ":email": email }
        };

        let plansRecord = await docClient.query(params).promise();
        plansRecord = plansRecord.Items
        callback(null, { statusCode: 200, body: JSON.stringify(plansRecord) })
    } catch (err) {
        callback(null, { statusCode: 500, body: JSON.stringify(`${err} Couldn't insert data.`) });
    }
};

export default getAllUserPlan;

