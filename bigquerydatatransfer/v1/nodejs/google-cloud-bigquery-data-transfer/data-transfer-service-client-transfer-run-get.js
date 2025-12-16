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

// [START bigquerydatatransfer_v1_datatransferservice_transferrun_get]
// [START bigquerydatatransfer_datatransferservice_transferrun_get]
// [START bigquerydatatransfer_get_run_details]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Gets a transfer run.
 * A transfer run represents a single execution of a data transfer configuration.
 *
 * @param {string} projectId The Google Cloud project ID, for example 'example-project-id'.
 * @param {string} location The location of the transfer config, for example 'us-central1'.
 * @param {string} transferConfigId The ID of the transfer configuration, for example '1234a-5678-9012b'.
 * @param {string} runId The ID of the transfer run, for example 'abcdef-0123-4567-8901-fedcba987654'.
 */
async function getTransferRun(
  projectId,
  location = 'us-central1',
  transferConfigId = '1234a-5678-9012b',
  runId = 'abcdef-0123-4567-8901-fedcba987654',
) {
  const name = client.projectLocationTransferConfigRunPath(
    projectId,
    location,
    transferConfigId,
    runId,
  );
  const request = {
    name,
  };

  try {
    const [run] = await client.getTransferRun(request);
    console.log(`Got transfer run: ${run.name}`);
    console.log(`  Data Source Id: ${run.dataSourceId}`);
    if (run.runTime && run.runTime.seconds) {
      console.log(
        `  Run time: ${new Date(run.runTime.seconds * 1000).toISOString()}`,
      );
    }
    console.log(`  State: ${run.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer run ${name} not found.`);
    } else {
      console.error(`Error getting transfer run ${name}:`, err);
    }
  }
}

// [END bigquerydatatransfer_get_run_details]
// [END bigquerydatatransfer_datatransferservice_transferrun_get]
// [END bigquerydatatransfer_v1_datatransferservice_transferrun_get]

module.exports = {
  getTransferRun,
};
