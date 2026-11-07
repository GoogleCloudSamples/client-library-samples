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

// [START networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists supported services for Multicloud Data Transfer in the specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region (for example, 'us-central1').
 */
async function listMulticloudDataTransferSupportedServices(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [services] = await client.listMulticloudDataTransferSupportedServices(request);

    console.log(`Listed multicloud data transfer supported services for ${parent}:`);
    if (services.length === 0) {
      console.log('No supported services found.');
    } else {
      for (const service of services) {
        console.log(`Supported service: ${service.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
      return;
    }
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
      return;
    }
    console.error(`API error: ${err.message}`);
  }
}

module.exports = { listMulticloudDataTransferSupportedServices };
// [END networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
