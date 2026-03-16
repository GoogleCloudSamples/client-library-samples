// Copyright 2025 Google LLC
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

// [START dlp_v2_dlpservice_jobtrigger_get_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Gets a job trigger by its full resource name.
 *
 * A job trigger is a configuration that allows you to automate the execution of
 * DLP inspection jobs on a schedule or in response to certain events.
 *
 * @param {string} projectId The Google Cloud Project ID. (e.g., 'my-project-id')
 * @param {string} locationId The GCP location of the job trigger. (e.g., 'global', 'us-central1')
 * @param {string} jobTriggerId The ID of the job trigger to retrieve. (e.g., 'my-job-trigger-id')
 */
async function getJobTrigger(projectId, locationId, jobTriggerId) {
  const name = `projects/${projectId}/locations/${locationId}/jobTriggers/${jobTriggerId}`;

  const request = {
    name,
  };

  try {
    const [jobTrigger] = await client.getJobTrigger(request);

    console.log(`Name: ${jobTrigger.name}`);
    console.log(`  Display Name: ${jobTrigger.displayName}`);
    console.log(`  Description: ${jobTrigger.description}`);
    console.log(`  Status: ${jobTrigger.status}`);
    if (jobTrigger.createTime) {
      const createTime = new Date(
        jobTrigger.createTime.seconds * 1000 +
          jobTrigger.createTime.nanos / 1000000,
      );
      console.log(`  Create Time: ${createTime}`);
    }
    if (jobTrigger.inspectJob) {
      console.log('  Inspect Job Configuration:');
      if (jobTrigger.inspectJob.inspectConfig) {
        console.log(
          `    Min Likelihood: ${jobTrigger.inspectJob.inspectConfig.minLikelihood}`,
        );
        if (jobTrigger.inspectJob.inspectConfig.infoTypes) {
          console.log(
            `    Info Types: ${jobTrigger.inspectJob.inspectConfig.infoTypes
              .map(it => it.name)
              .join(', ')}`,
          );
        }
      }
    }
    if (jobTrigger.errors && jobTrigger.errors.length > 0) {
      console.log('  Errors:');
      jobTrigger.errors.forEach(error => {
        console.log(
          `    Code: ${error.details.code}, Message: ${error.details.message}`,
        );
      });
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Job trigger '${jobTriggerId}' not found in project '${projectId}' and location '${locationId}'.`,
      );
    } else {
      console.error('Error getting job trigger:', err);
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await getJobTrigger(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'global' or 'us-central1'
 - Job Trigger ID like 'example-job-trigger-id'
Usage:
 node dlp-service-client-job-trigger-get-async.js example-project-id global example-job-trigger-id
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getJobTrigger,
};
