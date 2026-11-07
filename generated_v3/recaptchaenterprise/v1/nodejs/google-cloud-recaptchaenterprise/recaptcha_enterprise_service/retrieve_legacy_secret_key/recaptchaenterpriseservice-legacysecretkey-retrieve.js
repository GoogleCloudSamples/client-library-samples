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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Retrieves the legacy secret key for a specified reCAPTCHA Enterprise key.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} keyId - ID of the Key (for example, 'example-key-id')
 */
async function retrieveLegacySecretKey(projectId, keyId) {
  try {
    const key = client.keyPath(projectId, keyId);
    const request = {
      key,
    };

    const [response] = await client.retrieveLegacySecretKey(request);
    console.log(`Legacy secret key: ${response.legacySecretKey}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Key not found: ${projectId}/${keyId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving secret key: ${projectId}/${keyId}`);
    } else {
      console.error(`Error retrieving legacy secret key: ${err.message}`);
    }
  }
}

module.exports = { retrieveLegacySecretKey };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
