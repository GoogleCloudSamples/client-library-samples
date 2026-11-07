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

// [START dlp_v2_dlpservice_storedinfotype_create]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the createStoredInfoType method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} storedInfoTypeId - The ID of the stored info type (for example, 'example-stored-info-type'). Can contain letters, numbers, and hyphens up to 100 characters. If empty, the service generates one.
 */
async function createStoredInfoType(projectId, storedInfoTypeId) {
  try {
    const parent = `projects/${projectId}`;
    const config = {
      displayName: 'Example Account Identifier',
      description: 'Matches account IDs formatted as 4 digits, a hyphen, and 4 digits',
      regex: {
        pattern: '^[0-9]{4}-[0-9]{4}$',
      },
    };

    const request = {
      parent,
      config,
      storedInfoTypeId,
    };

    const [response] = await client.createStoredInfoType(request);
    console.log(`Created stored infoType: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Stored infoType already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createStoredInfoType };
// [END dlp_v2_dlpservice_storedinfotype_create]
