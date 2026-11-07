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

// [START apphub_v1_apphub_application_update]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Updates an existing AppHub application.
 *
 * @param {string} projectId - The Google Cloud host project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} applicationId - The Application identifier.
 */
async function updateApplication(projectId, locationId, applicationId) {
  try {
    const application = {
      name: `projects/${projectId}/locations/${locationId}/applications/${applicationId}`,
      description: 'Updated description for the application',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateApplication({
      application,
      updateMask,
    });

    const [response] = await operation.promise();

    console.log(`Updated application: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Application not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateApplication };
// [END apphub_v1_apphub_application_update]
