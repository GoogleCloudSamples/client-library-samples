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

// [START contactcenterinsights_v1_contactcenterinsights_bulk_delete_conversations]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Deletes conversations in bulk matching a filter.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function bulkDeleteConversations(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const request = {
      parent,
      filter: 'create_time < "2020-01-01T00:00:00Z"',
      force: true,
    };

    // Initiate the long-running bulk delete operation
    const [operation] = await client.bulkDeleteConversations(request);
    console.log(`Bulk delete operation started: ${operation.name}`);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log('Bulk delete operation completed successfully');
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to bulk delete conversations: ${err.message}`);
    }
  }
}

module.exports = { bulkDeleteConversations };
// [END contactcenterinsights_v1_contactcenterinsights_bulk_delete_conversations]
