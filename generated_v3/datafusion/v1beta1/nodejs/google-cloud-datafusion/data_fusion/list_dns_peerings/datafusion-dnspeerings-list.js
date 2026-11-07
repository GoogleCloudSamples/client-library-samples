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

// [START datafusion_v1beta1_datafusion_dnspeerings_list]
'use strict';

const {v1beta1} = require('@google-cloud/data-fusion');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.DataFusionClient();

/**
 * Lists DNS peerings for a Cloud Data Fusion instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the instance is located (for example, 'us-central1').
 * @param {string} instanceId - The ID of the existing Cloud Data Fusion instance.
 */
async function listDnsPeerings(projectId, locationId, instanceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

    const [dnsPeerings] = await client.listDnsPeerings({parent});

    if (dnsPeerings.length === 0) {
      console.log(`No DNS peerings found for instance ${instanceId}.`);
      return;
    }

    for (const dnsPeering of dnsPeerings) {
      console.log(`DNS Peering: ${dnsPeering.name}`);
      console.log(`  Domain: ${dnsPeering.domain}`);
      console.log(`  Target Project: ${dnsPeering.targetProject}`);
      console.log(`  Target Network: ${dnsPeering.targetNetwork}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {listDnsPeerings};
// [END datafusion_v1beta1_datafusion_dnspeerings_list]
