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

// [START certificatemanager_v1_certificatemanager_trustconfig_get]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the getTrustConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} trustConfigId - The caller-chosen ID of the TrustConfig (for example, 'example-trust-config'). Must match regex `[a-z0-9-]{1,63}`.
 */
async function getTrustConfig(projectId, locationId, trustConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/trustConfigs/${trustConfigId}`;

    const [trustConfig] = await client.getTrustConfig({name});

    console.log(`Trust config name: ${trustConfig.name}`);
    console.log(`Description: ${trustConfig.description}`);
    console.log(`Update time: ${trustConfig.updateTime?.seconds}`);

    return trustConfig;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Trust config not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to access trust config.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument supplied.');
    } else {
      console.error(`Error retrieving trust config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTrustConfig };
// [END certificatemanager_v1_certificatemanager_trustconfig_get]
