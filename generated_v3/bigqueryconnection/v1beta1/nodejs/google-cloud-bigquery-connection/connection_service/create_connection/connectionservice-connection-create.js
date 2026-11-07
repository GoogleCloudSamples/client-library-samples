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

// [START bigqueryconnection_v1beta1_connectionservice_connection_create]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the createConnection method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} connectionId - The caller-chosen identifier for the connection. Must contain only lowercase letters and digits, starting with a letter.
 */
async function createConnection(projectId, locationId, connectionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const connection = {
      friendlyName: 'Example Cloud SQL Connection',
      description: 'Connection for external PostgreSQL database queries',
      cloudSql: {
        instanceId: `${projectId}:${locationId}:example-instance`,
        database: 'example-database',
        type: 'POSTGRES',
        credential: {
          username: 'example-user',
          password: 'example-password',
        },
      },
    };

    const request = {
      parent,
      connectionId,
      connection,
    };

    const [response] = await client.createConnection(request);
    console.log(`Connection created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Connection already exists in project ${projectId}: ${err.message}`);
      return;
    }
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided for connection creation: ${err.message}`);
      return;
    }
    console.error(`Connection creation failed: ${err.message}`);
    throw err;
  }
}

module.exports = { createConnection };
// [END bigqueryconnection_v1beta1_connectionservice_connection_create]
