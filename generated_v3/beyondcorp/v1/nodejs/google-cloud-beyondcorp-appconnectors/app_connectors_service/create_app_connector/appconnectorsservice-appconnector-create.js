// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START beyondcorp_v1_appconnectorsservice_appconnector_create]
'use strict';

const {AppConnectorsServiceClient} = require('@google-cloud/appconnectors');
const {status} = require('@grpc/grpc-js');

const client = new AppConnectorsServiceClient();

/**
 * Creates a BeyondCorp App Connector.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createAppConnector(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const serviceAccount = {
      email: `example-sa@${projectId}.iam.gserviceaccount.com`,
    };
    const principalInfo = {
      serviceAccount,
    };
    const appConnector = {
      displayName: 'Example App Connector',
      principalInfo,
      labels: {
        environment: 'production',
      },
    };

    const request = {
      parent,
      appConnector,
    };

    // Initiate the long-running operation to create the App Connector
    const [operation] = await client.createAppConnector(request);
    const [response] = await operation.promise();

    console.log(`Created App Connector: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`App Connector already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createAppConnector };
// [END beyondcorp_v1_appconnectorsservice_appconnector_create]
