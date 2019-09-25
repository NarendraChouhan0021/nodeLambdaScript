import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();

const updateUserPlans = async (event, context, callback) => {

    const { email, planId, dates } = JSON.parse(event.body);
    let datesObjKey = Object.keys(dates)[0]

    try {
        let updatePlans = {
            TableName: 'dev-Plans',
            Key: { email, planId },
            UpdateExpression: "SET #dates.#objKey = :locVal",
            ExpressionAttributeNames: {
                '#dates': 'dates',
                '#objKey': datesObjKey,
            },
            ExpressionAttributeValues: {
                ':locVal': dates[datesObjKey]
            },
            ReturnValues: "UPDATED_NEW"
        };
        await docClient.update(updatePlans).promise();

        callback(null, { statusCode: 200, body: JSON.stringify("Updated Successfully") })
    } catch (err) {
        callback(null, { statusCode: 500, body: JSON.stringify(`${err} Couldn't insert data.`) });
    }
};

export default updateUserPlans;


