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

// [START backupdr_v1_backupdr_initialize_service]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the initializeService method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function initializeService(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serviceConfig`;
    const resourceType = 'compute.googleapis.com/Instance';

    const request = {
      name,
      resourceType,
    };

    // InitializeService is a long-running operation; await completion.
    const [operation] = await client.initializeService(request);
    const [response] = await operation.promise();

    console.log(`Service initialized successfully: ${name}`);
    console.log(response);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service configuration already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while initializing service: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for service initialization: ${err.message}`);
    } else {
      console.error(`Failed to initialize service: ${err.message}`);
    }
  }
}

module.exports = { initializeService };
// [END backupdr_v1_backupdr_initialize_service]
