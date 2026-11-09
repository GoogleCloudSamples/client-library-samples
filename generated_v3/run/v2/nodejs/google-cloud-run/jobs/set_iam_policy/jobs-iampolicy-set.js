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

// [START run_v2_jobs_set_iam_policy]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Use the setIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Cloud Run Job is located (for example, 'us-central1').
 * @param {string} jobId - The identifier of the Cloud Run Job.
 */
async function setIamPolicy(projectId, locationId, jobId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;
    const policy = {
      bindings: [
        {
          role: 'roles/run.viewer',
          members: [
            `serviceAccount:example-compute@${projectId}.iam.gserviceaccount.com`,
          ],
        },
      ],
    };
    const updateMask = {
      paths: ['bindings'],
    };

    const [response] = await client.setIamPolicy({
      resource,
      policy,
      updateMask,
    });

    console.log(`IAM policy successfully set for: ${resource}`);
    console.log(`Policy etag: ${response.etag}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`The specified job was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Insufficient permissions to update IAM policy: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid policy or resource specification: ${err.message}`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { setIamPolicy };
// [END run_v2_jobs_set_iam_policy]
