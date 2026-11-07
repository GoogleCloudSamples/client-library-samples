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

// [START discoveryengine_v1beta_rankservice_rank]
'use strict';

const {RankServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new RankServiceClient();

/**
 * Use the rank method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} query - The query against which records are ranked (for example, 'what is google cloud').
 */
async function rank(projectId, locationId, query) {
  try {
    const rankingConfig = `projects/${projectId}/locations/${locationId}/rankingConfigs/default_ranking_config`;
    const records = [
      {
        id: 'example-record-1',
        title: 'Google Cloud Platform Overview',
        content:
          'Google Cloud provides computing resources, data storage, and machine learning services.',
      },
      {
        id: 'example-record-2',
        title: 'Discovery Engine Ranking Service',
        content:
          'The RankService evaluates and ranks a list of records based on relevance to a search query.',
      },
    ];

    const request = {
      rankingConfig,
      query,
      records,
    };

    const [response] = await client.rank(request);

    console.log('Ranked records:');
    for (const record of response.records) {
      console.log(`Record ID: ${record.id}, Score: ${record.score}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Rank request failed: ${err.message}`);
    }
  }
}

module.exports = { rank };
// [END discoveryengine_v1beta_rankservice_rank]
