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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_remove_ip_override]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Use the removeIpOverride method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} keyId - The reCAPTCHA Enterprise key ID. Read from an existing Key resource.
 */
async function removeIpOverride(projectId, keyId) {
  try {
    const ipOverrideData = {
      ip: '198.51.100.1',
      overrideType: 'ALLOW',
    };
    const name = `projects/${projectId}/keys/${keyId}`;

    const request = {
      name,
      ipOverrideData,
    };

    const [response] = await client.removeIpOverride(request);
    console.log(`Removed IP override from key: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Key or IP override not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { removeIpOverride };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_remove_ip_override]
