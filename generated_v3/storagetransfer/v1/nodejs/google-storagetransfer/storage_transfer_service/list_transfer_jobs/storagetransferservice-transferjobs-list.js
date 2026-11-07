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

// [START storagetransfer_v1_storagetransferservice_transferjobs_list]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Use the listTransferJobs method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the transfer jobs.
 */
async function listTransferJobs(projectId) {
  try {
    const filter = JSON.stringify({projectId});
    const request = {
      filter,
    };

    const [jobs] = await client.listTransferJobs(request);

    console.log(`Found ${jobs.length} transfer job(s).`);
    for (const job of jobs) {
      console.log(`Job Name: ${job.name}`);
      console.log(`Description: ${job.description}`);
      console.log(`Status: ${job.status}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listTransferJobs };
// [END storagetransfer_v1_storagetransferservice_transferjobs_list]
