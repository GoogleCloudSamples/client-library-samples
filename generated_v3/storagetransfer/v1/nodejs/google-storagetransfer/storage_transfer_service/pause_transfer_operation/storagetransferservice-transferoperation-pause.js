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

// [START storagetransfer_v1_storagetransferservice_pause_transfer_operation]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Pauses an actively running transfer operation.
 *
 * @param {string} name - Required. The server-generated name of the transfer operation to pause, formatted as 'transferOperations/{operation_id}'.
 */
async function pauseTransferOperation(name) {
  try {
    const request = {
      name,
    };

    await client.pauseTransferOperation(request);
    console.log(`Paused transfer operation: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer operation not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Transfer operation cannot be paused: ${err.message}`);
    } else {
      console.error(`Unexpected gRPC error (${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { pauseTransferOperation };
// [END storagetransfer_v1_storagetransferservice_pause_transfer_operation]
