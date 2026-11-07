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

// [START discoveryengine_v1_rankservice_rank]
'use strict';

const {RankServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new RankServiceClient();

/**
 * Use the rank method
 *
 * @param {string} projectNumId - ID of the ProjectNum (for example, 'example-projectnum-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function rank(projectNumId, locationId) {
  try {
    const rankingConfig = client.rankingConfigPath(
      projectNumId,
      locationId,
      'default_ranking_config'
    );
    const records = [
      {
        id: 'record-1',
        title: 'Example Document Title 1',
        content: 'Example document content about cloud computing services.',
      },
      {
        id: 'record-2',
        title: 'Example Document Title 2',
        content: 'Example document content about ranking algorithms.',
      },
    ];

    const request = {
      rankingConfig,
      records,
      query: 'cloud computing',
    };

    const [response] = await client.rank(request);

    console.log('Ranking completed successfully.');
    for (const record of response.records || []) {
      console.log(`Record ID: ${record.id}, Score: ${record.score}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { rank };
// [END discoveryengine_v1_rankservice_rank]
