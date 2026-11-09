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

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_create]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Creates a Server TLS Policy in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serverTlsPolicyId - ID of the ServerTlsPolicy (for example, 'example-servertlspolicy-id')
 */
async function createServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const serverTlsPolicy = {
      description: 'Example Server TLS Policy',
      allowOpen: false,
      serverCertificate: {
        certificateProviderInstance: {
          pluginInstance: 'google_cloud_private_ca',
        },
      },
    };

    const request = {
      parent,
      serverTlsPolicyId,
      serverTlsPolicy,
    };

    const [operation] = await client.createServerTlsPolicy(request);
    const [response] = await operation.promise();

    console.log(`Server TLS Policy created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Server TLS Policy ${serverTlsPolicyId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for Server TLS Policy creation: ${err.message}`);
    } else {
      console.error(`Failed to create Server TLS Policy: ${err.message}`);
    }
  }
}

module.exports = { createServerTlsPolicy };
// [END networksecurity_v1beta1_networksecurity_servertlspolicy_create]
