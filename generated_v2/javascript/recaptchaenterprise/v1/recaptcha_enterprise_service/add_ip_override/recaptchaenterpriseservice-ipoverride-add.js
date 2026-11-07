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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_add_ip_override]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Adds an IP override to an existing reCAPTCHA Enterprise key.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} keyId - The reCAPTCHA Enterprise key ID (for example, retrieved via ListKeys or CreateKey).
 */
async function addIpOverride(projectId, keyId) {
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

    const [response] = await client.addIpOverride(request);
    console.log(`Added IP override for ${ipOverrideData.ip} to key ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`IP override already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { addIpOverride };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_add_ip_override]
