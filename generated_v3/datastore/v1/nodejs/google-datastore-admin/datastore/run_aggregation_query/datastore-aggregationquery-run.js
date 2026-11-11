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

// [START datastore_v1_datastore_run_aggregation_query]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Use the runAggregationQuery method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function runAggregationQuery(projectId) {
  try {
    const request = {
      projectId: projectId,
      aggregationQuery: {
        nestedQuery: {
          kind: [
            {
              name: 'Task',
            },
          ],
        },
        aggregations: [
          {
            alias: 'total_count',
            count: {},
          },
        ],
      },
    };

    const [response] = await client.runAggregationQuery(request);
    console.log('Aggregation query executed successfully.');
    if (response.batch && response.batch.aggregationResults) {
      for (const result of response.batch.aggregationResults) {
        console.log('Aggregation result:', JSON.stringify(result.aggregateProperties));
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid request parameters provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Requested resource not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API call failed with status code ${err.code}:`, err.message);
    } else {
      console.error('Execution failed:', err);
    }
  }
}

module.exports = { runAggregationQuery };
// [END datastore_v1_datastore_run_aggregation_query]
