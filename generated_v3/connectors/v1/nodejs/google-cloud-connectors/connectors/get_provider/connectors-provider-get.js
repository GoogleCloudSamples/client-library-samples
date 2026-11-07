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

// [START connectors_v1_connectors_provider_get]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Gets a Connectors provider.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'global')
 * @param {string} providerId - ID of the Provider (for example, 'example-provider-id')
 */
async function getProvider(projectId, locationId, providerId) {
  try {
    // Connectors provider resources are only supported in the 'global' location.
    const location = locationId === 'global' ? locationId : 'global';
    const name = client.providerPath(projectId, location, providerId);
    const request = {
      name,
    };

    const [provider] = await client.getProvider(request);
    console.log(`Retrieved provider: ${provider.name}`);
    console.log(`Display name: ${provider.displayName}`);
    return provider;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Provider not found for ID ${providerId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing provider ${providerId}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument for provider ${providerId}: ${err.message}`);
    } else {
      console.error(`Failed to get provider: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProvider };
// [END connectors_v1_connectors_provider_get]
