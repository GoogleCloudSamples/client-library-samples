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

// [START eventarc_v1_eventarc_providers_list]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Eventarc providers in a specified location.
 */
async function listProviders() {
  const client = new EventarcClient();

  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [providers] = await client.listProviders(request);

    console.log(`Found ${providers.length} provider(s):`);
    for (const provider of providers) {
      console.log(`- ${provider.name} (${provider.displayName})`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listProviders };
// [END eventarc_v1_eventarc_providers_list]
