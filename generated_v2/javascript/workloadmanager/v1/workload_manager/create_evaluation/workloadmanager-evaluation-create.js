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

// [START workloadmanager_v1_workloadmanager_evaluation_create]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Use the createEvaluation method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} evaluationId - ID of the Evaluation (for example, 'example-evaluation-id')
 */
async function createEvaluation(projectId, locationId, evaluationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const evaluation = {
      description: 'Workload Manager evaluation for best practices',
    };

    const request = {
      parent,
      evaluationId,
      evaluation,
    };

    const [operation] = await client.createEvaluation(request);
    const [response] = await operation.promise();

    console.log(`Created evaluation: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Evaluation ${evaluationId} already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createEvaluation };
// [END workloadmanager_v1_workloadmanager_evaluation_create]
