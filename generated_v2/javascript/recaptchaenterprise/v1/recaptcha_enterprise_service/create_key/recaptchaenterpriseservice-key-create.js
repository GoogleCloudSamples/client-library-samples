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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Creates a reCAPTCHA Enterprise key.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createKey(projectId) {
  try {
    const parent = client.projectPath(projectId);
    const key = {
      displayName: 'Web Score Key',
      webSettings: {
        allowedDomains: ['example.com'],
        integrationType: 'SCORE',
      },
    };

    const [response] = await client.createKey({
      parent,
      key,
    });

    console.log(`Created key: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Key already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create key: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createKey };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
