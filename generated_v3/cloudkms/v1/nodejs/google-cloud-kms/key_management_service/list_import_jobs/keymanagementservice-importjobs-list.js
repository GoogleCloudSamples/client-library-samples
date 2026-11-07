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

// [START cloudkms_v1_keymanagementservice_importjobs_list]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Lists import jobs for a given KeyRing.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the KeyRing (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-specified ID of the KeyRing to list import jobs from (for example, 'example-key-ring'). Must match regular expression `[a-zA-Z0-9_-]{1,63}`.
 */
async function listImportJobs(projectId, locationId, keyRingId) {
  try {
    const parent = client.keyRingPath(projectId, locationId, keyRingId);

    const [importJobs] = await client.listImportJobs({
      parent,
    });

    for (const importJob of importJobs) {
      console.log(`Name: ${importJob.name}`);
      console.log(`State: ${importJob.state}`);
      console.log(`Import method: ${importJob.importMethod}`);
      console.log(`Protection level: ${importJob.protectionLevel}`);
    }

    return importJobs;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`KeyRing not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listImportJobs };
// [END cloudkms_v1_keymanagementservice_importjobs_list]
