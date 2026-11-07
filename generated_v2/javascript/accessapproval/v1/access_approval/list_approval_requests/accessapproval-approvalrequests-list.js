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

// [START accessapproval_v1_accessapproval_approvalrequests_list]
'use strict';

const {AccessApprovalClient} = require('@google-cloud/access-approval');
const {status} = require('@grpc/grpc-js');

const client = new AccessApprovalClient();

/**
 * Lists Access Approval requests for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID for which to list access approval requests.
 */
async function listApprovalRequests(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const [requests] = await client.listApprovalRequests({
      parent,
    });

    if (requests.length === 0) {
      console.log(`No approval requests found for ${parent}.`);
      return;
    }

    for (const request of requests) {
      console.log(`Approval request name: ${request.name}`);
      console.log(`Requested resource: ${request.requestedResourceName}`);
      console.log(`Request reason: ${request.requestedReason?.type}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied listing requests for ${projectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} was not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error listing approval requests: ${err.message}`);
    }
  }
}

module.exports = { listApprovalRequests };
// [END accessapproval_v1_accessapproval_approvalrequests_list]
