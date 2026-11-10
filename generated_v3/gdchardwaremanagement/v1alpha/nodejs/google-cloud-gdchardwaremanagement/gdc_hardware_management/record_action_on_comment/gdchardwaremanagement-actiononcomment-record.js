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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_record_action_on_comment]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the recordActionOnComment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} orderId - ID of the Order (for example, 'example-order-id')
 * @param {string} commentId - ID of the Comment (for example, 'example-comment-id')
 */
async function recordActionOnComment(projectId, locationId, orderId, commentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/orders/${orderId}/comments/${commentId}`;
    const actionType = 'READ';

    const request = {
      name,
      actionType,
    };

    const [response] = await client.recordActionOnComment(request);
    console.log(`Action recorded on comment: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { recordActionOnComment };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_record_action_on_comment]
