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

// [START cloudresourcemanager_v3_projects_projects_search]
'use strict';

const {ProjectsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new ProjectsClient();

/**
 * Use the searchProjects method
 *
 * @param {string} query - A query string for searching for projects that the caller has resourcemanager.projects.get permission to (e.g., 'state:ACTIVE' or 'displayName:My Project').
 */
async function searchProjects(query) {
  try {
    const request = {
      query,
    };

    const [projects] = await client.searchProjects(request);

    for (const project of projects) {
      console.log(`Project ID: ${project.projectId}`);
      console.log(`Display Name: ${project.displayName}`);
      console.log(`State: ${project.state}`);
    }

    return projects;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid query argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication error: ${err.message}`);
    } else {
      console.error(`Failed to search projects: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { searchProjects };
// [END cloudresourcemanager_v3_projects_projects_search]
