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

// [START accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]
'use strict';

const {AccessApprovalClient} = require('@google-cloud/access-approval');
const {status} = require('@grpc/grpc-js');

const client = new AccessApprovalClient();

/**
 * Retrieves the Access Approval service account for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID for which to retrieve the Access Approval service account. This is a caller-chosen identifier.
 */
async function getAccessApprovalServiceAccount(projectId) {
  try {
    const name = `projects/${projectId}/serviceAccount`;

    const request = {
      name,
    };

    const [serviceAccount] = await client.getAccessApprovalServiceAccount(request);

    console.log(`Retrieved service account: ${serviceAccount.name}`);
    console.log(`Service account email: ${serviceAccount.accountEmail}`);
    return serviceAccount;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service account not found for project ${projectId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${projectId}: ${err.message}`);
    } else {
      console.error(`API error retrieving service account (${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAccessApprovalServiceAccount };
// [END accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]
