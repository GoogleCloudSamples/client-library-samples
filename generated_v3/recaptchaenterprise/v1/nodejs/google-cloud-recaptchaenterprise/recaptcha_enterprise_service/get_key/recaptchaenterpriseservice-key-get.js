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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Retrieves a reCAPTCHA Enterprise key.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} keyId - The key identifier (for example, 'example-key-id')
 */
async function getKey(projectId, keyId) {
  try {
    // Construct the fully qualified resource name for the key
    const name = client.keyPath(projectId, keyId);

    const request = {
      name,
    };

    const [key] = await client.getKey(request);

    console.log(`Key name: ${key.name}`);
    console.log(`Display name: ${key.displayName}`);
    return key;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Key not found: projects/${projectId}/keys/${keyId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing key: projects/${projectId}/keys/${keyId}`);
    } else {
      console.error(`API error retrieving key: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getKey };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]
