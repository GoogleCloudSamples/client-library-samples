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

// [START workloadmanager_v1_workloadmanager_run_evaluation]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Use the runEvaluation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1' or 'global').
 * @param {string} evaluationId - ID of an existing Evaluation.
 * @param {string} executionId - Caller-chosen ID for the new Execution.
 */
async function runEvaluation(projectId, locationId, evaluationId, executionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/evaluations/${evaluationId}`;
    const execution = {
      runType: 'ONE_TIME',
      labels: {
        env: 'example-environment',
      },
    };

    const request = {
      name,
      executionId,
      execution,
    };

    // RunEvaluation initiates a long-running operation
    const [operation] = await client.runEvaluation(request);
    const [response] = await operation.promise();

    console.log(`Execution completed: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Evaluation resource not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Execution identifier already exists: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { runEvaluation };
// [END workloadmanager_v1_workloadmanager_run_evaluation]
