import {authorizeAccount, getAuthorizationToken, updateCors} from './backblaze-cors.js';

export default function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
        description: 'this is a skeleton plopfile',
        prompts: [{
            type: 'keyId',
            name: 'keyId',
            message: 'Your B2 keyID'
          }, {
            type: 'applicationKey',
            name: 'applicationKey',
            message: 'Your B2 Application Key'
          }, {
            type: 'bucket',
            name: 'bucket',
            message: 'Your B2 Bucket'
          }], // array of inquirer prompts
        actions: [{
            type: 'testAPI',
            configProp: 'c'
        },{
            type: 'updateCors',
            configProp: 'd'
        }]  // array of actions
    });

    plop.setActionType('testAPI', async function ( config) {
        // do something
        return new Promise(async (resolve, reject) => {
            const token = getAuthorizationToken(config.keyId, config.applicationKey)
            const authorized = await authorizeAccount(token)
            //console.error(authorized.data)
            if (authorized) {
                resolve("API Connection succesful");
            } else {
                reject('Unable to connect to the B2 API', authorized);
            }
        });
    });

    plop.setActionType('updateCors', async function ( config) {
        // do something
        return new Promise(async (resolve, reject) => {
            const response = await updateCors(config.keyId, config.applicationKey, config.bucket)
            if (response) {
                resolve("CORS updated")
            } else {
                reject("Unable to update CORS")
            }
        });
    });
    

};