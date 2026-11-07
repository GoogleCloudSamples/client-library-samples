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

// [START workloadmanager_v1_workloadmanager_evaluation_get]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Use the getEvaluation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the evaluation.
 * @param {string} evaluationId - The identifier of the evaluation.
 */
async function getEvaluation(projectId, locationId, evaluationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/evaluations/${evaluationId}`;
    const request = {
      name,
    };

    const [evaluation] = await client.getEvaluation(request);
    console.log(`Retrieved evaluation: ${evaluation.name}`);
    return evaluation;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Evaluation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing evaluation: ${err.message}`);
    } else {
      console.error(`Error retrieving evaluation: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEvaluation };
// [END workloadmanager_v1_workloadmanager_evaluation_get]
