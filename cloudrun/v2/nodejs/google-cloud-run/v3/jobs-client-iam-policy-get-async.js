// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START cloudrun_v2_jobs_iampolicy_get_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // For gRPC status codes

// Instantiate the client outside the function for reusability.
// The client is initialized with Application Default Credentials (ADC) by default.
const client = new JobsClient();

/**
 * Retrieves the IAM policy for a Cloud Run job.
 *
 * This sample demonstrates how to get the IAM policy for a specific Cloud Run job.
 * The IAM policy defines who has what permissions on the job.
 *
 * @param {string} projectId The Google Cloud Project ID. For example, 'my-project-id'.
 * @param {string} locationId The Google Cloud location (region) of the job. For example, 'us-central1'.
 * @param {string} jobId The ID of the Cloud Run job. For example, 'my-job-id'.
 */
async function getJobIamPolicy(
  projectId = 'your-project-id', // Example: 'my-project-id'
  locationId = 'us-central1', // Example: 'us-central1'
  jobId = 'my-job-id', // Example: 'my-job-id'
) {
  // Construct the full resource name for the job.
  // This is the format expected by the API: projects/{project}/locations/{location}/jobs/{job}
  const jobName = client.jobPath(projectId, locationId, jobId);

  const request = {
    resource: jobName,
    // Optional: Specify options for GetIamPolicy if needed.
    // For example, to retrieve only the policy's etag:
    // options: {
    //   requestedPolicyVersion: 1,
    // },
  };

  try {
    // Make the API call to get the IAM policy.
    const [policy] = await client.getIamPolicy(request);

    console.log(`Successfully retrieved IAM policy for job: ${jobName}`);
    console.log('Policy:');
    // Log the policy object in a readable JSON format.
    console.log(JSON.stringify(policy, null, 2));

    // Assert: Verify the result by printing relevant policy details.
    if (policy.bindings && policy.bindings.length > 0) {
      console.log('Policy Bindings:');
      policy.bindings.forEach(binding => {
        console.log(`  Role: ${binding.role}`);
        console.log(
          `    Members: ${binding.members ? binding.members.join(', ') : 'None'}`,
        );
      });
    } else {
      console.log('  No bindings found in the policy.');
    }
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Job '${jobName}' not found. Please ensure the project ID, location, and job ID are correct.`,
      );
      // Suggest corrective action: Check resource name.
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied for job '${jobName}'. Ensure your authenticated principal has 'run.jobs.getIamPolicy' permission.`,
      );
      // Suggest corrective action: Check IAM permissions.
    } else {
      // Log other unexpected errors.
      console.error(
        `An unexpected error occurred while getting IAM policy for job '${jobName}':`,
        err,
      );
    }
  }
}
// [END cloudrun_v2_jobs_iampolicy_get_async]

module.exports = {
  getJobIamPolicy,
};
