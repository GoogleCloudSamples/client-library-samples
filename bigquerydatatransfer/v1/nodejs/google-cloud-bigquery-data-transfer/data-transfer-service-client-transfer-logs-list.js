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

// [START bigquerydatatransfer_v1_datatransferservice_transferlogs_list]
// [START bigquerydatatransfer_datatransferservice_transferlogs_list]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists log messages for a transfer run.
 * Transfer runs are created for each transfer configuration, and they may have associated log messages.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the transfer configuration (for example, 'us-central1').
 * @param {string} transferConfigId The transfer configuration ID (for example, '1234a-5678-9b12c').
 * @param {string} runId The transfer run ID (for example, 'd123e-4567-89b0c-1d23e').
 */
async function listTransferLogs(projectId, location, transferConfigId, runId) {
  const parent = client.projectLocationTransferConfigRunPath(
    projectId,
    location,
    transferConfigId,
    runId,
  );
  const request = {
    parent,
  };

  try {
    const [logs] = await client.listTransferLogs(request);

    console.log(`Logs for run '${runId}':`);
    if (logs.length === 0) {
      console.log('No logs found.');
      return;
    }

    for (const log of logs) {
      console.log(
        `  [${log.severity}] ${new Date(
          log.messageTime.seconds * 1000,
        ).toISOString()}: ${log.messageText}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Transfer run not found: ${runId}`);
    } else {
      console.error('Error listing transfer logs:', err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferlogs_list]
// [END bigquerydatatransfer_v1_datatransferservice_transferlogs_list]

module.exports = {
  listTransferLogs,
};
