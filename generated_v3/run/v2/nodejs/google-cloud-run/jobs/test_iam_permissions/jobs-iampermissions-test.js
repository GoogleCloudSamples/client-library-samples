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

// [START run_v2_jobs_test_iam_permissions]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Cloud Run Job is deployed.
 * @param {string} jobId - The identifier of the Cloud Run Job.
 */
async function testIamPermissions(projectId, locationId, jobId) {
  try {
    const permissions = ['run.jobs.get', 'run.jobs.run'];
    const resource = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);

    console.log(`Resource: ${resource}`);
    console.log(`Granted permissions: ${response.permissions ? response.permissions.join(', ') : 'none'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`gRPC error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END run_v2_jobs_test_iam_permissions]
