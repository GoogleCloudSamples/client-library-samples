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

// [START cloudkms_v1_autokey_keyhandles_list]
'use strict';

const {AutokeyClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new AutokeyClient();

/**
 * Lists Autokey KeyHandle resources in a given project and location.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud location (for example, 'us-central1')
 */
async function listKeyHandles(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [keyHandles] = await client.listKeyHandles({
      parent,
    });

    if (!keyHandles || keyHandles.length === 0) {
      console.log(`No key handles found in ${parent}.`);
      return keyHandles;
    }

    for (const keyHandle of keyHandles) {
      console.log(`Key handle: ${keyHandle.name}`);
      console.log(`  KMS key: ${keyHandle.kmsKey}`);
      console.log(`  Resource type selector: ${keyHandle.resourceTypeSelector}`);
    }

    return keyHandles;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied listing key handles: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error('Non-API error encountered:', err);
    }
    throw err;
  }
}

module.exports = { listKeyHandles };
// [END cloudkms_v1_autokey_keyhandles_list]
