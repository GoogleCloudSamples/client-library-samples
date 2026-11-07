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

// [START publicca_v1_publiccertificateauthorityservice_externalaccountkey_create]
'use strict';

const {PublicCertificateAuthorityServiceClient} = require('@google-cloud/publicca');
const {status} = require('@grpc/grpc-js');

/**
 * Creates an ExternalAccountKey in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'global')
 */
async function createExternalAccountKey(projectId, locationId) {
  const client = new PublicCertificateAuthorityServiceClient();

  try {
    // Public Certificate Authority Service requires the 'global' location.
    const location = locationId === 'global' ? locationId : 'global';
    const parent = client.locationPath(projectId, location);
    const externalAccountKey = {};

    const [response] = await client.createExternalAccountKey({
      parent,
      externalAccountKey,
    });

    console.log(`Created external account key: ${response.name}`);
    console.log(`Key ID: ${response.keyId}`);
    console.log(`B64 MAC Key: ${response.b64MacKey}`);
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating external account key: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createExternalAccountKey };
// [END publicca_v1_publiccertificateauthorityservice_externalaccountkey_create]
