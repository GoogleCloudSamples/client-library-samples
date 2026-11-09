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

// [START cloudresourcemanager_v3_projects_project_get]
'use strict';

const {ProjectsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new ProjectsClient();

/**
 * Retrieves a Google Cloud project by its project ID or number.
 *
 * @param {string} projectId - The unique, user-assigned ID of the project or the server-assigned project number.
 */
async function getProject(projectId) {
  try {
    const name = `projects/${projectId}`;
    const [project] = await client.getProject({name});

    console.log(`Project Name: ${project.name}`);
    console.log(`Project ID: ${project.projectId}`);
    console.log(`Display Name: ${project.displayName}`);
    console.log(`State: ${project.state}`);

    return project;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${projectId}.`);
    } else {
      console.error(`Failed to retrieve project: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProject };
// [END cloudresourcemanager_v3_projects_project_get]
