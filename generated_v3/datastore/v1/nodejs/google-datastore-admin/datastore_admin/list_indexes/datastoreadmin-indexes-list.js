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

// [START datastore_v1_datastoreadmin_indexes_list]
'use strict';

const {DatastoreAdminClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreAdminClient();

/**
 * Lists composite indexes in Google Cloud Datastore.
 */
async function listIndexes() {
  const projectId = await client.getProjectId();

  const request = {
    projectId,
  };

  try {
    const [indexes] = await client.listIndexes(request);
    console.log('Indexes:');
    for (const index of indexes) {
      console.log(`Index ID: ${index.indexId}`);
      console.log(`Kind: ${index.kind}`);
      console.log(`State: ${index.state}`);
      console.log(`Ancestor: ${index.ancestor}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Failed to list indexes:', err.message);
    }
  }
}

module.exports = {listIndexes};
// [END datastore_v1_datastoreadmin_indexes_list]
