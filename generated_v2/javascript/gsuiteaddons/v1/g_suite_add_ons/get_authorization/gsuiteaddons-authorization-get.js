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

// [START gsuiteaddons_v1_gsuiteaddons_authorization_get]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Retrieves the Google Workspace add-ons authorization information for a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getAuthorization(projectId) {
  try {
    const name = `projects/${projectId}/authorization`;
    const request = {
      name,
    };

    const [response] = await client.getAuthorization(request);
    console.log(`Authorization name: ${response.name}`);
    console.log(`Service account email: ${response.serviceAccountEmail}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Authorization resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getAuthorization };
// [END gsuiteaddons_v1_gsuiteaddons_authorization_get]
