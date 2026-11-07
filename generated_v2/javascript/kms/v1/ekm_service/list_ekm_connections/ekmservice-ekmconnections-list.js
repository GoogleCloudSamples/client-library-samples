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

// [START cloudkms_v1_ekmservice_ekmconnections_list]
'use strict';

const {EkmServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new EkmServiceClient();

/**
 * Lists Cloud EKM connections in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listEkmConnections(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [ekmConnections] = await client.listEkmConnections({
      parent,
    });

    if (ekmConnections.length === 0) {
      console.log('No EKM connections found.');
      return;
    }

    for (const connection of ekmConnections) {
      console.log(`EKM Connection: ${connection.name}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing ${locationId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC failed with gRPC status ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listEkmConnections };
// [END cloudkms_v1_ekmservice_ekmconnections_list]
