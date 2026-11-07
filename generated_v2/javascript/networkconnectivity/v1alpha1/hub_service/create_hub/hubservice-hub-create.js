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

// [START networkconnectivity_v1alpha1_hubservice_hub_create]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Creates a Network Connectivity Center hub.
 */
async function createHub() {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}/locations/global`;
    const hubId = 'central-hub';
    const hub = {
      description: 'Network Connectivity Center hub',
      labels: {
        environment: 'production',
      },
    };

    const [operation] = await client.createHub({
      parent,
      hubId,
      hub,
    });

    const [response] = await operation.promise();
    console.log(`Hub created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Hub already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create hub: ${err.message || err}`);
    }
  }
}

module.exports = { createHub };
// [END networkconnectivity_v1alpha1_hubservice_hub_create]
