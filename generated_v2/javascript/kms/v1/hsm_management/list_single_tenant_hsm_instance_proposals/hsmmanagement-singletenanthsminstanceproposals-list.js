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

// [START cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]
'use strict';

const {HsmManagementClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new HsmManagementClient();

/**
 * Lists proposals for a SingleTenantHsmInstance.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud location (for example, 'us-central1').
 * @param {string} singleTenantHsmInstanceId - SingleTenantHsmInstance identifier.
 */
async function listSingleTenantHsmInstanceProposals(projectId, locationId, singleTenantHsmInstanceId) {
  const parent = `projects/${projectId}/locations/${locationId}/singleTenantHsmInstances/${singleTenantHsmInstanceId}`;

  try {
    const [proposals] = await client.listSingleTenantHsmInstanceProposals({
      parent,
    });

    console.log(`Retrieved ${proposals.length} proposal(s).`);
    for (const proposal of proposals) {
      console.log(`Proposal: ${proposal.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listSingleTenantHsmInstanceProposals };
// [END cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]
