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

// [START workloadmanager_v1_workloadmanager_evaluation_update]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Use the updateEvaluation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the evaluation (e.g., 'us-central1').
 * @param {string} evaluationId - The identifier of the existing evaluation to update.
 */
async function updateEvaluation(projectId, locationId, evaluationId) {
  try {
    const evaluation = {
      name: `projects/${projectId}/locations/${locationId}/evaluations/${evaluationId}`,
      description: 'Updated evaluation description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      evaluation,
      updateMask,
    };

    const [operation] = await client.updateEvaluation(request);
    const [response] = await operation.promise();

    console.log(`Evaluation updated successfully: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Evaluation not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateEvaluation };
// [END workloadmanager_v1_workloadmanager_evaluation_update]
