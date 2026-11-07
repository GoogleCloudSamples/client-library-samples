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

// [START privilegedaccessmanager_v1_privilegedaccessmanager_entitlements_search]
'use strict';

const {PrivilegedAccessManagerClient} = require('@google-cloud/privilegedaccessmanager');
const {status} = require('@grpc/grpc-js');

const client = new PrivilegedAccessManagerClient();

/**
 * Searches entitlements in Privileged Access Manager.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the entitlement parent resource (for example, 'global').
 */
async function searchEntitlements(projectId, locationId) {
  try {
    // Construct the parent path from resource identifiers.
    const parent = `projects/${projectId}/locations/${locationId}`;
    // Search only for entitlements that the caller can request grants for.
    const callerAccessType = 'GRANT_REQUESTER';

    const request = {
      parent,
      callerAccessType,
    };

    const [entitlements] = await client.searchEntitlements(request);

    console.log(`Search completed. Found ${entitlements.length} entitlement(s).`);
    for (const entitlement of entitlements) {
      console.log(`Entitlement name: ${entitlement.name}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied searching entitlements: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API operation failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { searchEntitlements };
// [END privilegedaccessmanager_v1_privilegedaccessmanager_entitlements_search]
