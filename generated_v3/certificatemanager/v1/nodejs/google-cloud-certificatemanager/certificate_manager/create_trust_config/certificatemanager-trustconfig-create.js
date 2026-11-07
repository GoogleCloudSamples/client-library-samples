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

// [START certificatemanager_v1_certificatemanager_trustconfig_create]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the createTrustConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} trustConfigId - ID of the TrustConfig (for example, 'example-trustconfig-id')
 */
async function createTrustConfig(projectId, locationId, trustConfigId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    // Keep data structures flat to limit nesting depth
    const trustAnchor = {
      pemCertificate:
        '-----BEGIN CERTIFICATE-----\n' +
        'MIIDDzCCAfegAwIBAgIUbW15ZXhhbXBsZWNlcnRpZmljYXRl\n' +
        '-----END CERTIFICATE-----',
    };

    const trustStore = {
      trustAnchors: [trustAnchor],
    };

    const trustConfig = {
      description: 'Example TrustConfig for mutual TLS',
      trustStores: [trustStore],
    };

    const request = {
      parent,
      trustConfigId,
      trustConfig,
    };

    // Initialize the long-running operation to create the TrustConfig
    const [operation] = await client.createTrustConfig(request);
    const [response] = await operation.promise();

    console.log(`Created TrustConfig: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TrustConfig ${trustConfigId} already exists:`, err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when creating TrustConfig:', err.message);
    } else if (err.code) {
      console.error(`API error (${err.code}):`, err.message);
    } else {
      console.error('Error creating TrustConfig:', err);
    }
  }
}

module.exports = { createTrustConfig };
// [END certificatemanager_v1_certificatemanager_trustconfig_create]
