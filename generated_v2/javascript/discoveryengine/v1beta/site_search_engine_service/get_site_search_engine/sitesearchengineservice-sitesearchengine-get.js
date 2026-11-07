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

// [START discoveryengine_v1beta_sitesearchengineservice_sitesearchengine_get]
'use strict';

const {SiteSearchEngineServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new SiteSearchEngineServiceClient();

/**
 * Use the getSiteSearchEngine method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} dataStoreId - ID of the DataStore (for example, 'example-datastore-id')
 */
async function getSiteSearchEngine(projectId, locationId, dataStoreId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataStores/${dataStoreId}/siteSearchEngine`;
    const request = {
      name,
    };

    const [response] = await client.getSiteSearchEngine(request);
    console.log(`Retrieved site search engine: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Site search engine retrieval failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSiteSearchEngine };
// [END discoveryengine_v1beta_sitesearchengineservice_sitesearchengine_get]
