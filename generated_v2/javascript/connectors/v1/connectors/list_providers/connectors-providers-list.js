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

// [START connectors_v1_connectors_providers_list]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Lists providers in a specified Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region (Connectors providers require 'global')
 */
async function listProviders(projectId, locationId) {
  try {
    // The Connectors API only supports provider listings in the 'global' location.
    const location = locationId === 'global' ? locationId : 'global';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [providers] = await client.listProviders(request);

    console.log(`Retrieved ${providers.length} provider(s):`);
    for (const provider of providers) {
      console.log(`Provider name: ${provider.name}`);
      console.log(`Display name: ${provider.displayName}`);
    }
    return providers;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing providers: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listProviders };
// [END connectors_v1_connectors_providers_list]
