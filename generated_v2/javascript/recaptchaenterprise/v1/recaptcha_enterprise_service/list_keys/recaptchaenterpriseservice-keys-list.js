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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_keys_list]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Lists reCAPTCHA keys in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listKeys(projectId) {
  try {
    const formattedProjectId =
      typeof projectId === 'object' && projectId !== null
        ? projectId.projectId || projectId.project_id
        : projectId;

    const parent = client.projectPath(formattedProjectId);

    const [keys] = await client.listKeys({
      parent,
    });

    if (!keys || keys.length === 0) {
      console.log('No keys found.');
      return;
    }

    for (const key of keys) {
      console.log(`Key name: ${key.name}`);
      console.log(`Display name: ${key.displayName}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing keys: ${err.message}`);
    } else {
      console.error(`Google Cloud API error occurred: ${err.message}`);
    }
  }
}

module.exports = { listKeys };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_keys_list]
