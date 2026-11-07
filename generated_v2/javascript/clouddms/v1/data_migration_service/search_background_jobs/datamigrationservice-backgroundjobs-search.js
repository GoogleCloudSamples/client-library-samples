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

// [START datamigration_v1_datamigrationservice_backgroundjobs_search]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the searchBackgroundJobs method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the conversion workspace is located.
 * @param {string} conversionWorkspaceId - The ID of the conversion workspace to search background jobs for. Caller-chosen when created or retrieved from an existing conversion workspace.
 */
async function searchBackgroundJobs(projectId, locationId, conversionWorkspaceId) {
  try {
    const conversionWorkspace = `projects/${projectId}/locations/${locationId}/conversionWorkspaces/${conversionWorkspaceId}`;

    const request = {
      conversionWorkspace,
      returnSize: 10,
    };

    const [response] = await client.searchBackgroundJobs(request);

    console.log(`Found ${response.jobs ? response.jobs.length : 0} background jobs:`);
    for (const job of response.jobs || []) {
      console.log(`Job ID: ${job.id}, Job Type: ${job.jobType}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Conversion workspace not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API call failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { searchBackgroundJobs };
// [END datamigration_v1_datamigrationservice_backgroundjobs_search]
