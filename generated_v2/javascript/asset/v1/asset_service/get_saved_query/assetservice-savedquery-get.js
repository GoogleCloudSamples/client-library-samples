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

// [START cloudasset_v1_assetservice_savedquery_get]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Retrieves an existing Cloud Asset saved query.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} savedQueryId - The client-assigned ID of the saved query.
 */
async function getSavedQuery(projectId, savedQueryId) {
  try {
    let projectIdentifier = projectId;

    // The Cloud Asset API requires a numeric project number for saved queries.
    if (!/^\d+$/.test(projectId)) {
      try {
        const response = await client.auth.request({
          url: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`,
        });
        if (response?.data?.projectNumber) {
          projectIdentifier = response.data.projectNumber;
        }
      } catch (err) {
        if (
          err.code !== status.NOT_FOUND &&
          err.code !== status.PERMISSION_DENIED
        ) {
          // Fall back to asset search if Resource Manager is unavailable.
        }
      }

      if (!/^\d+$/.test(projectIdentifier)) {
        try {
          const [resources] = await client.searchAllResources({
            scope: `projects/${projectId}`,
            pageSize: 1,
          });
          const match = resources?.[0]?.project?.match(/projects\/(\d+)/);
          if (match) {
            projectIdentifier = match[1];
          }
        } catch (err) {
          if (
            err.code !== status.NOT_FOUND &&
            err.code !== status.PERMISSION_DENIED
          ) {
            // Fall back to metadata server if asset search is unavailable.
          }
        }
      }

      if (!/^\d+$/.test(projectIdentifier)) {
        try {
          const metadataResponse = await fetch(
            'http://metadata.google.internal/computeMetadata/v1/project/numeric-project-id',
            {
              headers: {'Metadata-Flavor': 'Google'},
              signal: AbortSignal.timeout(1000),
            }
          );
          if (metadataResponse.ok) {
            const numericId = (await metadataResponse.text()).trim();
            if (/^\d+$/.test(numericId)) {
              projectIdentifier = numericId;
            }
          }
        } catch (err) {
          if (err.name !== 'TimeoutError' && err.name !== 'TypeError') {
            // Keep original identifier if metadata is unreachable.
          }
        }
      }
    }

    const name = `projects/${projectIdentifier}/savedQueries/${savedQueryId}`;
    const request = {name};

    const [savedQuery] = await client.getSavedQuery(request);

    console.log(`Retrieved saved query: ${savedQuery.name}`);
    console.log(`Description: ${savedQuery.description}`);
    return savedQuery;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Saved query not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {getSavedQuery};
// [END cloudasset_v1_assetservice_savedquery_get]
