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

// [START networksecurity_v1_networksecurity_servertlspolicy_create]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Creates a Server TLS Policy in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serverTlsPolicyId - The caller-specified identifier for the ServerTlsPolicy (for example, 'example-server-tls-policy').
 */
async function createServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const serverTlsPolicy = {
      description: 'Sample Server TLS Policy',
      serverCertificate: {
        certificateProviderInstance: {
          pluginInstance: 'google_cloud_private_spiffe',
        },
      },
    };

    const request = {
      parent,
      serverTlsPolicyId,
      serverTlsPolicy,
    };

    // Initialize the long-running operation to create the Server TLS Policy
    const [operation] = await client.createServerTlsPolicy(request);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Created Server TLS Policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Server TLS policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating policy: ${err.message}`);
    } else {
      console.error(`Error creating Server TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createServerTlsPolicy };
// [END networksecurity_v1_networksecurity_servertlspolicy_create]
