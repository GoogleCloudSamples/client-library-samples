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

// [START storagetransfer_v1_storagetransferservice_run_transfer_job]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Use the runTransferJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} jobName - The server-generated name of the transfer job to run, formatted as 'transferJobs/{job_id}'. Read this value from an existing transfer job (such as from a CreateTransferJob or ListTransferJobs response).
 */
async function runTransferJob(projectId, jobName) {
  try {
    const request = {
      projectId,
      jobName,
    };

    const [operation] = await client.runTransferJob(request);
    console.log(`Started transfer operation: ${operation.name}`);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Transfer operation completed with status: ${response.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer job not found: ${jobName}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Transfer job precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error running transfer job: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { runTransferJob };
// [END storagetransfer_v1_storagetransferservice_run_transfer_job]
