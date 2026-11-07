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

// [START contentwarehouse_v1_synonymsetservice_synonymset_delete]
'use strict';

const {SynonymSetServiceClient} = require('@google-cloud/contentwarehouse');
const {status} = require('@grpc/grpc-js');

const client = new SynonymSetServiceClient();

/**
 * Deletes a synonym set.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} contextId - ID of the Context (for example, 'example-context-id')
 */
async function deleteSynonymSet(locationId, contextId) {
  try {
    const projectNumber = process.env.PROJECT_NUMBER || (await client.getProjectId());
    const name = client.synonymSetPath(projectNumber, locationId, contextId);

    const request = {
      name,
    };

    await client.deleteSynonymSet(request);
    console.log(`Deleted synonym set: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Synonym set not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {deleteSynonymSet};
// [END contentwarehouse_v1_synonymsetservice_synonymset_delete]
