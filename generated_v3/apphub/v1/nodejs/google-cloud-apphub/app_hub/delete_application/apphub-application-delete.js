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

// [START apphub_v1_apphub_application_delete]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Use the deleteApplication method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} applicationId - ID of the Application (for example, 'example-application-id')
 */
async function deleteApplication(projectId, locationId, applicationId) {
  try {
    const name = client.applicationPath(projectId, locationId, applicationId);
    const request = {
      name,
    };

    const [operation] = await client.deleteApplication(request);
    await operation.promise();
    console.log(`Application deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Application not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete application: ${err.message}`);
    }
  }
}

module.exports = { deleteApplication };
// [END apphub_v1_apphub_application_delete]
