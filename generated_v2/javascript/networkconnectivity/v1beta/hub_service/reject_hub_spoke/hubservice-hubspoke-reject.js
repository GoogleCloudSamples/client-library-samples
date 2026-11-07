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

// [START networkconnectivity_v1beta_hubservice_reject_hub_spoke]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the rejectHubSpoke method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The identifier of the Network Connectivity Center hub.
 * @param {string} spokeUri - The URI or fully-qualified resource name of the spoke to reject from the hub.
 */
async function rejectHubSpoke(projectId, hubId, spokeUri) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}`;
    const request = {
      name,
      spokeUri,
    };

    const [operation] = await client.rejectHubSpoke(request);
    const [response] = await operation.promise();

    console.log(`Rejected spoke: ${spokeUri}`);
    if (response.hub) {
      console.log(`Hub name: ${response.hub.name}`);
      console.log(`Hub state: ${response.hub.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub or spoke not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed for rejection: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error('Unexpected error rejecting hub spoke:', err);
    }
  }
}

module.exports = { rejectHubSpoke };
// [END networkconnectivity_v1beta_hubservice_reject_hub_spoke]
