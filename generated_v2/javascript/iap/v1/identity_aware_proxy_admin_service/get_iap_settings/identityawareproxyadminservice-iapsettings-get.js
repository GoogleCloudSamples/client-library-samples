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

// [START iap_v1_identityawareproxyadminservice_iapsettings_get]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Use the getIapSettings method
 *
 * @param {string} name - The resource name of the IAP protected resource for which to retrieve settings, such as projects/{project_id} or projects/{project_id}/iap_web.
 */
async function getIapSettings(name) {
  try {
    const request = {
      name,
    };

    const [response] = await client.getIapSettings(request);

    console.log(`Retrieved IAP settings for: ${response.name}`);
    if (response.accessSettings) {
      console.log('Access settings present in configuration.');
    }
    if (response.applicationSettings) {
      console.log('Application settings present in configuration.');
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving settings for: ${name}`);
    } else {
      console.error(`API error retrieving IAP settings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIapSettings };
// [END iap_v1_identityawareproxyadminservice_iapsettings_get]
