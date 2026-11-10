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

// [START firestore_v1_firestore_run_aggregation_query]
'use strict';

const {v1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const client = new v1.FirestoreClient();

/**
 * Runs an aggregation query against a Firestore database.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} databaseId - ID of the Database (for example, 'example-database-id')
 */
async function runAggregationQuery(projectId, databaseId) {
  try {
    const parent = `projects/${projectId}/databases/${databaseId}/documents`;

    const structuredQuery = {
      from: [{collectionId: 'users'}],
    };

    const structuredAggregationQuery = {
      structuredQuery,
      aggregations: [
        {
          alias: 'totalUsers',
          count: {},
        },
      ],
    };

    const request = {
      parent,
      structuredAggregationQuery,
    };

    const stream = client.runAggregationQuery(request);

    for await (const response of stream) {
      if (response.result) {
        console.log('Aggregation result:', response.result.aggregateFields);
      }
      if (response.readTime) {
        console.log('Read time:', response.readTime);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Database or collection not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid query argument:', err.message);
    } else {
      console.error('Failed to run aggregation query:', err);
    }
  }
}

module.exports = { runAggregationQuery };
// [END firestore_v1_firestore_run_aggregation_query]
