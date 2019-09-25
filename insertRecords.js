import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
const docClient = new AWS.DynamoDB.DocumentClient();

const insertRecords = async (event, context, callback) => {

    const data = JSON.parse(event.body);
    const email = data.email
    delete data.email
    try {
        const uUid = uuid.v1();

        const params = {
            TableName: 'dev-Plans',
            Item: {
                email: email,
                planId: uUid,
                ...data
            }
        };
        await docClient.put(params).promise();

        callback(null, { statusCode: 200, body: JSON.stringify("Succesfully created the record") })
    } catch (err) {
        callback(null, { statusCode: 500, body: JSON.stringify(`${err} Couldn't insert data.`) });
    }
};

export default insertRecords;
