// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigqueryconnection_v1_connectionservice_connections_list]
const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Lists BigQuery connections in a given project and location.
 *
 * @param {string} projectId The Google Cloud project ID. E.g. 'example-project-id'
 * @param {string} location The location to list connections for. E.g. 'us-central1'
 */
async function listConnections(projectId, location) {
  const parent = client.locationPath(projectId, location);

  const request = {
    parent,
    pageSize: 100,
  };

  try {
    const [connections] = await client.listConnections(request, {
      autoPaginate: false,
    });

    if (connections.length === 0) {
      console.log(
        `No connections found in ${location} for project ${projectId}.`,
      );
      return;
    }

    console.log('Connections:');
    for (const connection of connections) {
      console.log(`  Name: ${connection.name}`);
      console.log(`  Friendly Name: ${connection.friendlyName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Project '${projectId}' or location '${location}' not found.`,
      );
    } else {
      console.error('Error listing connections:', err);
    }
  }
}
// [END bigqueryconnection_v1_connectionservice_connections_list]

module.exports = { listConnections };
