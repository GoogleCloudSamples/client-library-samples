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

// [START cloudresourcemanager_v3_projects_project_update]
'use strict';

const {ProjectsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new ProjectsClient();

/**
 * Use the updateProject method
 *
 * @param {string} projectId - The unique, user-assigned ID or server-assigned number of the project.
 */
async function updateProject(projectId) {
  try {
    const project = {
      name: `projects/${projectId}`,
      displayName: 'Updated Project Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateProject({
      project,
      updateMask,
    });

    const [updatedProject] = await operation.promise();
    console.log(`Updated project: ${updatedProject.name}`);
    console.log(`Display name: ${updatedProject.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating project: ${projectId}`);
    } else if (err.code) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Error updating project: ${err.message}`);
    }
  }
}

module.exports = { updateProject };
// [END cloudresourcemanager_v3_projects_project_update]
