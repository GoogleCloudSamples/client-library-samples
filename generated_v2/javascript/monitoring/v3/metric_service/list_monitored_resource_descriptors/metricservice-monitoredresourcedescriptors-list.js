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

// [START monitoring_v3_metricservice_monitoredresourcedescriptors_list]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Use the listMonitoredResourceDescriptors method
 *
 * @param {string} projectId - The Google Cloud project ID on which to execute the request.
 */
async function listMonitoredResourceDescriptors(projectId) {
  try {
    const name = `projects/${projectId}`;
    const request = {
      name,
    };

    const [descriptors] = await client.listMonitoredResourceDescriptors(request);

    for (const descriptor of descriptors) {
      console.log(`Type: ${descriptor.type}`);
      console.log(`Display name: ${descriptor.displayName}`);
      console.log(`Description: ${descriptor.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { listMonitoredResourceDescriptors };
// [END monitoring_v3_metricservice_monitoredresourcedescriptors_list]
