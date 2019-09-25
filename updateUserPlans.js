import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();

const updateUserPlans = async (event, context, callback) => {

    const { email, planId, dates } = JSON.parse(event.body);

    try {
        let plansRecord = await docClient.get({
            TableName: 'dev-Plans',
            IndexName: 'emailIndex',
            Key: { email, planId }
        }).promise();

        plansRecord = plansRecord.Item

       if (plansRecord.dates.hasOwnProperty(dates)) {
            var insssss = { "reading": ["212121256789"], "complete": true }

            let updatePlans = {
                TableName: 'dev-Plans',
                Key: { email, planId },
                UpdateExpression: "SET #dates.#objKey = :locVal",
                ExpressionAttributeNames: {
                    '#dates': 'dates',
                    '#objKey': dates,
                },
                ExpressionAttributeValues: {
                    ':locVal': insssss
                },
                ReturnValues: "UPDATED_NEW"
            };

            await docClient.update(updatePlans).promise();

            callback(null, { statusCode: 200, body: JSON.stringify("Updated Successfully") })
        } else {
            callback(null, { statusCode: 500, body: JSON.stringify(`couldn't update the plan dates.`) });
        }
    } catch (err) {
        callback(null, { statusCode: 500, body: JSON.stringify(`${err} Couldn't insert data.`) });
    }
};

export default updateUserPlans;


