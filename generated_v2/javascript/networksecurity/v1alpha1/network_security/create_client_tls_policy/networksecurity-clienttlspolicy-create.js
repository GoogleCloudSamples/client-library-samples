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

// [START networksecurity_v1alpha1_networksecurity_clienttlspolicy_create]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Creates a Client TLS policy in the specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} clientTlsPolicyId - ID of the ClientTlsPolicy (for example, 'example-clienttlspolicy-id')
 */
async function createClientTlsPolicy(projectId, locationId, clientTlsPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const clientTlsPolicy = {
      description: 'Client TLS policy for secure internal communication',
      sni: 'example.internal.net',
    };

    const request = {
      parent,
      clientTlsPolicyId,
      clientTlsPolicy,
    };

    const [operation] = await client.createClientTlsPolicy(request);
    const [response] = await operation.promise();

    console.log(`Client TLS policy created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Client TLS policy already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating Client TLS policy: ${err.message}`);
    } else {
      console.error(`Failed to create Client TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createClientTlsPolicy };
// [END networksecurity_v1alpha1_networksecurity_clienttlspolicy_create]
