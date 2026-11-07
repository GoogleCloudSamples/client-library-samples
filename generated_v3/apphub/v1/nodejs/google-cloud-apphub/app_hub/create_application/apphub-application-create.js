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

// [START apphub_v1_apphub_application_create]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Use the createApplication method
 *
 * @param {string} projectId - The Google Cloud project ID where the Application will be hosted.
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1' or 'global') where the Application will be created.
 * @param {string} applicationId - Caller-chosen identifier for the Application. Must contain only lowercase letters, numbers, or hyphens, start with a letter, end with a letter or number, and have a maximum length of 63 characters.
 */
async function createApplication(projectId, locationId, applicationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const application = {
      displayName: 'Example Application',
      scope: {
        type: locationId === 'global' ? 'GLOBAL' : 'REGIONAL',
      },
    };

    const request = {
      parent,
      applicationId,
      application,
    };

    const [operation] = await client.createApplication(request);
    const [response] = await operation.promise();

    console.log(`Application created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Application already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createApplication };
// [END apphub_v1_apphub_application_create]
