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

// [START firestore_v1beta1_firestore_partition_query]
'use strict';

const {v1beta1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.FirestoreClient();

/**
 * Partitions a query into multiple sub-queries.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} databaseId - The Firestore database ID (for example, '(default)' or a named database ID).
 */
async function partitionQuery(projectId, databaseId) {
  try {
    // PartitionQuery requires the parent path to point to the documents root
    const parent = `projects/${projectId}/databases/${databaseId}/documents`;

    // PartitionQuery requires ordering by __name__ ascending and all descendants enabled
    const collectionSelector = {
      collectionId: 'example-collection',
      allDescendants: true,
    };
    const orderField = {
      fieldPath: '__name__',
    };
    const orderRule = {
      field: orderField,
      direction: 'ASCENDING',
    };
    const structuredQuery = {
      from: [collectionSelector],
      orderBy: [orderRule],
    };

    const partitionCount = 2;

    const request = {
      parent,
      structuredQuery,
      partitionCount,
    };

    const [partitions] = await client.partitionQuery(request);

    console.log(`Partition query returned ${partitions.length} partition cursor(s).`);
    for (const [index, cursor] of partitions.entries()) {
      console.log(`Partition ${index}:`, JSON.stringify(cursor));
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Partition query failed: ${err.message}`);
    }
  }
}

module.exports = { partitionQuery };
// [END firestore_v1beta1_firestore_partition_query]
