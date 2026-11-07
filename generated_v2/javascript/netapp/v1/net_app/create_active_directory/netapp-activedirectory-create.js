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

// [START netapp_v1_netapp_activedirectory_create]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the createActiveDirectory method
 *
 * @param {string} activeDirectoryId - Caller-chosen ID of the Active Directory configuration. Must be unique within the parent, contain only letters, numbers, and hyphens (up to 63 characters), start with a letter, and end with a letter or number.
 * @param {string} projectId - The ID of the Google Cloud project where the Active Directory configuration will be created.
 * @param {string} locationId - The Google Cloud region where the Active Directory configuration will be created.
 */
async function createActiveDirectory(activeDirectoryId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const activeDirectory = {
      domain: 'example.com',
      dns: '10.0.0.1',
      netBiosPrefix: 'EXAMPLE',
      username: 'administrator',
      password: 'example-password',
    };

    const [operation] = await client.createActiveDirectory({
      parent,
      activeDirectoryId,
      activeDirectory,
    });

    const [response] = await operation.promise();
    console.log(`Created Active Directory configuration: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Active Directory configuration already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createActiveDirectory };
// [END netapp_v1_netapp_activedirectory_create]
