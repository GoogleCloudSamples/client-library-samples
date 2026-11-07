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

// [START dataproc_v1_batchcontroller_batch_create]
'use strict';

const {BatchControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Use the createBatch method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dataproc region where the batch workload will be created.
 * @param {string} batchId - The ID to use for the batch workload, 4-63 lowercase alphanumeric characters or hyphens.
 */
async function createBatch(projectId, locationId, batchId) {
  // Dataproc requires regional endpoints when connecting outside the global region.
  const client = new BatchControllerClient({
    apiEndpoint: `${locationId}-dataproc.googleapis.com`,
  });

  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const batch = {
      sparkBatch: {
        mainClass: 'org.apache.spark.examples.SparkPi',
        jarFileUris: ['file:///usr/lib/spark/examples/jars/spark-examples.jar'],
        args: ['1000'],
      },
    };

    const [operation] = await client.createBatch({
      parent,
      batch,
      batchId,
    });
    const [response] = await operation.promise();

    console.log(`Batch created successfully: ${response.name}`);
    console.log(`Batch state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Batch already exists: ${batchId}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createBatch };
// [END dataproc_v1_batchcontroller_batch_create]
