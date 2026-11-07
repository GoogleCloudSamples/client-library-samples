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

// [START cloudasset_v1_assetservice_savedquery_create]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Creates a saved query for an asset inventory.
 *
 * @param {string} savedQueryId - The caller-chosen ID to use for the saved query.
 * @param {string} projectId - The Google Cloud project ID where the saved query is created.
 */
async function createSavedQuery(savedQueryId, projectId) {
  try {
    const parent = `projects/${projectId}`;
    const iamPolicyAnalysisQuery = {
      scope: `projects/${projectId}`,
      accessSelector: {
        roles: ['roles/owner'],
      },
    };
    const savedQuery = {
      description: 'Saved query for IAM policy analysis',
      content: {
        iamPolicyAnalysisQuery,
      },
    };

    const request = {
      parent,
      savedQueryId,
      savedQuery,
    };

    const [response] = await client.createSavedQuery(request);
    console.log(`Created saved query: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Saved query already exists: ${savedQueryId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error creating saved query: ${err.message}`);
    }
  }
}

module.exports = { createSavedQuery };
// [END cloudasset_v1_assetservice_savedquery_create]
