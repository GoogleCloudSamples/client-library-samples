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

// [START discoveryengine_v1beta_userlicenseservice_licenseconfigsusagestats_list]
'use strict';

const {UserLicenseServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new UserLicenseServiceClient();

/**
 * Retrieves license configuration usage statistics for a user store.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} userStoreId - ID of the UserStore (for example, 'example-userstore-id')
 */
async function listLicenseConfigsUsageStats(projectId, locationId, userStoreId) {
  try {
    // Construct the user store parent resource identifier
    const parent = `projects/${projectId}/locations/${locationId}/userStores/${userStoreId}`;

    const request = {
      parent,
    };

    const [response] = await client.listLicenseConfigsUsageStats(request);
    const usageStats = response.licenseConfigUsageStats || response.licenseConfigsUsageStats || [];

    console.log('Retrieved license configuration usage statistics:');
    for (const stat of usageStats) {
      console.log(`License Config: ${stat.licenseConfig}`);
      console.log(`Assigned Count: ${stat.assignedCount}`);
      console.log(`Active Count: ${stat.activeCount}`);
      console.log(`Unassigned Count: ${stat.unassignedCount}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listLicenseConfigsUsageStats };
// [END discoveryengine_v1beta_userlicenseservice_licenseconfigsusagestats_list]
