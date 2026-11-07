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

// [START kmsinventory_v1_keydashboardservice_cryptokeys_list]
'use strict';

const {KeyDashboardServiceClient} = require('@google-cloud/kms-inventory');
const {status} = require('@grpc/grpc-js');

const client = new KeyDashboardServiceClient();

/**
 * Use the listCryptoKeys method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listCryptoKeys(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [cryptoKeys] = await client.listCryptoKeys(request);
    for (const cryptoKey of cryptoKeys) {
      console.log(`CryptoKey: ${cryptoKey.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listCryptoKeys };
// [END kmsinventory_v1_keydashboardservice_cryptokeys_list]
