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

// [START firestore_v1_firestore_partition_query]
'use strict';

const {FirestoreClient} = require('@google-cloud/firestore').v1;
const {status} = require('@grpc/grpc-js');

const client = new FirestoreClient();

/**
 * Partitions a query to enable parallel reading.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} databaseId The Firestore database ID.
 */
async function partitionQuery(projectId, databaseId) {
  try {
    const parent = `projects/${projectId}/databases/${databaseId}/documents`;
    const request = {
      parent,
      structuredQuery: {
        from: [
          {
            collectionId: 'widgets',
            allDescendants: true,
          },
        ],
      },
      partitionCount: 2,
    };

    const [partitions] = await client.partitionQuery(request);
    console.log(`Retrieved ${partitions.length} partition cursors.`);
    for (const partition of partitions) {
      console.log(`Partition cursor values: ${JSON.stringify(partition.values)}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Error partitioning query:', err.message || err);
    }
  }
}

module.exports = { partitionQuery };
// [END firestore_v1_firestore_partition_query]
