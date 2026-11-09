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

// [START discoveryengine_v1alpha_rankservice_rank]
'use strict';

const {RankServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new RankServiceClient();

/**
 * Use the rank method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} rankingConfigId - The ID of the ranking config (for example, 'default_ranking_config').
 * @param {string} query - The query against which the records are ranked.
 */
async function rank(projectId, locationId, rankingConfigId, query) {
  try {
    const rankingConfig = client.rankingConfigPath(
      projectId,
      locationId,
      rankingConfigId
    );
    const records = [
      {
        id: 'record-1',
        title: 'Google Cloud Overview',
        content: 'Google Cloud offers computing, storage, and machine learning infrastructure.',
      },
      {
        id: 'record-2',
        title: 'Cloud Storage Details',
        content: 'Cloud Storage provides object storage for structured and unstructured data.',
      },
    ];

    const request = {
      rankingConfig,
      records,
      query,
    };

    const [response] = await client.rank(request);

    console.log('Rank response received successfully:');
    for (const record of response.records) {
      console.log(`Record ID: ${record.id}, Score: ${record.score}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Ranking configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Ranking operation failed: ${err.message}`);
    }
  }
}

module.exports = { rank };
// [END discoveryengine_v1alpha_rankservice_rank]
