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

// [START bigquerydatatransfer_v1_datatransferservice_transferruns_list]
// [START bigquerydatatransfer_datatransferservice_transferruns_list]
// [START bigquerydatatransfer_get_run_history]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists transfer runs for a given transfer configuration.
 *
 * This sample shows how to list all the transfer runs for a specific transfer
 * configuration, to monitor and audit data transfer jobs.
 *
 * @param {string} projectId The Google Cloud project ID, for example 'example-project-id'.
 * @param {string} location The Google Cloud region, for example 'us-central1'.
 * @param {string} configId The BigQuery Transfer Service config ID, for example 'example-config-id'.
 */
async function listTransferRuns(projectId, location, configId) {
  const parent = `projects/${projectId}/locations/${location}/transferConfigs/${configId}`;
  const request = {
    parent,
  };

  try {
    const [transferRuns] = await client.listTransferRuns(request);
    if (transferRuns.length === 0) {
      console.error(
        `No transfer runs found in project ${projectId} for ${location}.`,
      );
      return;
    }
    console.log(`Transfer runs for config '${configId}':`);
    for (const run of transferRuns) {
      console.log(`\nTransfer Run: ${run.name}`);
      console.log(`  Data Source Id: ${run.dataSourceId}`);
      if (run.runTime && run.runTime.seconds) {
        console.log(
          `  Run time: ${new Date(run.runTime.seconds * 1000).toISOString()}`,
        );
      }
      console.log(`  State: ${run.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer run not found: ${parent}`);
    } else {
      console.error('Error listing transfer runs:', err);
    }
  }
}
// [END bigquerydatatransfer_get_run_history]
// [END bigquerydatatransfer_datatransferservice_transferruns_list]
// [END bigquerydatatransfer_v1_datatransferservice_transferruns_list]

module.exports = {
  listTransferRuns,
};
