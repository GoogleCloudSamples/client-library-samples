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

// [START apphub_v1_apphub_discoveredworkload_get]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Use the getDiscoveredWorkload method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} discoveredWorkloadId - ID of the DiscoveredWorkload (for example, 'example-discoveredworkload-id')
 */
async function getDiscoveredWorkload(projectId, locationId, discoveredWorkloadId) {
  try {
    const name = client.discoveredWorkloadPath(
      projectId,
      locationId,
      discoveredWorkloadId
    );

    const request = {
      name,
    };

    const [response] = await client.getDiscoveredWorkload(request);
    console.log(`Discovered Workload Name: ${response.name}`);
    console.log(`Discovered Workload URI: ${response.workloadReference?.uri}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Discovered workload ${discoveredWorkloadId} not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for discovered workload ${discoveredWorkloadId}.`);
    } else {
      console.error('Failed to get discovered workload:', err);
    }
  }
}

module.exports = { getDiscoveredWorkload };
// [END apphub_v1_apphub_discoveredworkload_get]
