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

// [START bigquerydatatransfer_v1_datatransferservice_transferrun_delete]
// [START bigquerydatatransfer_datatransferservice_transferrun_delete]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Deletes a transfer run.
 * This action removes a specific execution instance of a transfer configuration.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The location of the transfer config (for example, 'us-central1').
 * @param {string} transferConfigId The ID of the transfer configuration (for example, '1234a123-123a-123a-123a-123456789abc').
 * @param {string} runId The ID of the transfer run (for example, '9876b987-987b-987b-987b-987654321cba').
 */
async function deleteTransferRun(
  projectId,
  location = 'us-central1',
  transferConfigId = '1234a123-123a-123a-123a-123456789abc',
  runId = '9876b987-987b-987b-987b-987654321cba',
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
    await client.deleteTransferRun(request);
    console.log(`Deleted transfer run ${name}.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer run ${name} not found.`);
    } else {
      console.error('Error deleting transfer run:', err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferrun_delete]
// [END bigquerydatatransfer_v1_datatransferservice_transferrun_delete]

module.exports = {
  deleteTransferRun,
};
