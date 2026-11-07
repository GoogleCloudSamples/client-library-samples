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

// [START retail_v2alpha_projectservice_project_get]
'use strict';

const {ProjectServiceClient} = require('@google-cloud/retail').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new ProjectServiceClient();

/**
 * Retrieves the retail project configuration.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getProject(projectId) {
  try {
    const name = `projects/${projectId}/retailProject`;

    const request = {
      name,
    };

    const [project] = await client.getProject(request);
    console.log(`Retrieved retail project: ${project.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Retail project resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for retail project: ${err.message}`);
    } else {
      console.error(`Failed to retrieve project: ${err.message}`);
    }
  }
}

module.exports = {getProject};
// [END retail_v2alpha_projectservice_project_get]
