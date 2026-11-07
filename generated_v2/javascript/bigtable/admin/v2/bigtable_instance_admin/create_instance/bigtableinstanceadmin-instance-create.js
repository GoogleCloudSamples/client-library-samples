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

// [START bigtable_v2_bigtableinstanceadmin_instance_create]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Creates a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The unique ID for the new Bigtable instance within its project (for example, 'example-instance').
 */
async function createInstance(projectId, instanceId) {
  try {
    const clusters = {
      'example-cluster': {
        location: `projects/${projectId}/locations/us-central1-b`,
        serveNodes: 1,
        defaultStorageType: 'SSD',
      },
    };
    const instance = {
      displayName: 'Sample Instance',
    };
    const parent = `projects/${projectId}`;

    // Initiate instance creation
    const [operation] = await client.createInstance({
      parent,
      instanceId,
      instance,
      clusters,
    });

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Created instance: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Instance ${instanceId} already exists:`, err.message);
    } else if (err.code) {
      console.error(`API error creating instance (gRPC code ${err.code}):`, err.message);
    } else {
      console.error('Unexpected error creating instance:', err);
    }
  }
}

module.exports = { createInstance };
// [END bigtable_v2_bigtableinstanceadmin_instance_create]
