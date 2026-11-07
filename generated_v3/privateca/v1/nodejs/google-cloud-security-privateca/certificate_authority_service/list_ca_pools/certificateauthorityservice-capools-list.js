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

// [START privateca_v1_certificateauthorityservice_capools_list]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Lists the Certificate Authority (CA) pools in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listCaPools(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const [caPools] = await client.listCaPools({parent});

    if (caPools.length === 0) {
      console.log('No CA pools found.');
      return;
    }

    for (const caPool of caPools) {
      console.log(`CA Pool: ${caPool.name}`);
      console.log(`Tier: ${caPool.tier}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listCaPools };
// [END privateca_v1_certificateauthorityservice_capools_list]
