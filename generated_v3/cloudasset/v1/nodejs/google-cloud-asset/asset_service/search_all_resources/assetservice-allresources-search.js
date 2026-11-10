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

// [START cloudasset_v1_assetservice_allresources_search]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Searches all Cloud resources within a specified project scope.
 *
 * @param {string} projectId - The Google Cloud project ID to search resources within.
 */
async function searchAllResources(projectId) {
  try {
    const scope = `projects/${projectId}`;
    const request = {
      scope,
      query: 'state:ACTIVE',
      pageSize: 10,
    };

    // Disable autoPaginate to restrict results to the specified page size
    const [resources] = await client.searchAllResources(request, {
      autoPaginate: false,
    });

    for (const resource of resources) {
      console.log(`Resource name: ${resource.name}`);
      console.log(`Asset type: ${resource.assetType}`);
      console.log(`Display name: ${resource.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied searching resources in scope: projects/${projectId}`
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Invalid argument provided for search request: ${err.message}`
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource or project not found: ${err.message}`);
    } else {
      console.error(`Search operation failed: ${err.message}`);
    }
  }
}

module.exports = { searchAllResources };
// [END cloudasset_v1_assetservice_allresources_search]
