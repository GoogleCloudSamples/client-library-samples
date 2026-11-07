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

// [START networkservices_v1_networkservices_servicebinding_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createServiceBinding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location/region (for example, 'global' or 'us-central1').
 * @param {string} serviceBindingId - Caller-chosen client identifier for the ServiceBinding resource (for example, 'example-service-binding').
 */
async function createServiceBinding(projectId, locationId, serviceBindingId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const serviceBinding = {
      description: 'Sample Service Binding',
      labels: {
        environment: 'production',
      },
    };

    const request = {
      parent,
      serviceBindingId,
      serviceBinding,
    };

    const [operation] = await client.createServiceBinding(request);
    const [response] = await operation.promise();

    console.log(`Service binding created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service binding already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating service binding: ${err.message}`);
    } else {
      console.error(`Failed to create service binding: ${err.message}`);
    }
  }
}

module.exports = { createServiceBinding };
// [END networkservices_v1_networkservices_servicebinding_create]
