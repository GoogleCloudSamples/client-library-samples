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

// [START databasecenter_v1beta_databasecenter_query_database_resource_groups]
'use strict';

const {DatabaseCenterClient} = require('@google-cloud/databasecenter');
const {status} = require('@grpc/grpc-js');

const client = new DatabaseCenterClient();

/**
 * Queries database resource groups for a project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function queryDatabaseResourceGroups(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [resourceGroups] = await client.queryDatabaseResourceGroups(request);

    console.log(`Retrieved ${resourceGroups.length} database resource group(s):`);
    for (const group of resourceGroups) {
      console.log(`- Resource group: ${group.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { queryDatabaseResourceGroups };
// [END databasecenter_v1beta_databasecenter_query_database_resource_groups]
