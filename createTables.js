import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB();

const createTables = (event, context, callback) => {

    try {
        var params = {
            TableName: 'dev-Plans',
            KeySchema: [
                { AttributeName: "email", KeyType: "HASH" }, //Partition key
                { AttributeName: "planId", KeyType: "RANGE" }
            ],
            AttributeDefinitions: [
                { AttributeName: "email", AttributeType: "S" },
                { AttributeName: "planId", AttributeType: "S" }
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'emailIndex',
                    KeySchema: [
                        {
                            AttributeName: 'email',
                            KeyType: "HASH"
                        },
                    ],
                    Projection: {
                        ProjectionType: "ALL"
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 10,
                        WriteCapacityUnits: 10
                    }
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        
        docClient.createTable(params, function (err, data) {
            console.log("poch gya............12...")
            if (err) {
                console.error(
                    "Unable to create table. Error JSON:",
                    JSON.stringify(err, null, 2)
                );
                callback(null, { statusCode: 500, body: JSON.stringify(`Unable to create table. Error JSON:${err}`) });
            } else {
                console.log(
                    "Created table. Table description JSON:",
                    JSON.stringify(data, null, 2)
                );
                callback(null, { statusCode: 200, body: JSON.stringify(`Successfully Created the table.`) });
            }
        });
    } catch (err) {
        callback(null, { statusCode: 500, body: JSON.stringify(`Unable to create table. Error JSON:${err}`) });
    }
};

export default createTables;
