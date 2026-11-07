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

// [START run_v2_jobs_iampolicy_get]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Retrieves the IAM policy for a Cloud Run job.
 *
 * @param {string} projectId - The Google Cloud project identifier.
 * @param {string} locationId - The Google Cloud region or location of the Job.
 * @param {string} jobId - The unique identifier of the Cloud Run Job.
 */
async function getIamPolicy(projectId, locationId, jobId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;

    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy etag: ${policy.etag}`);
    console.log(`Bindings count: ${policy.bindings ? policy.bindings.length : 0}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to get IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END run_v2_jobs_iampolicy_get]
