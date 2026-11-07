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

// [START workloadmanager_v1_workloadmanager_evaluation_delete]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Use the deleteEvaluation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the evaluation.
 * @param {string} evaluationId - The caller-specified identifier of the Evaluation to delete.
 */
async function deleteEvaluation(projectId, locationId, evaluationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/evaluations/${evaluationId}`;

    const [operation] = await client.deleteEvaluation({name});
    await operation.promise();

    console.log(`Successfully deleted evaluation: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Evaluation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err}`);
    }
  }
}

module.exports = { deleteEvaluation };
// [END workloadmanager_v1_workloadmanager_evaluation_delete]
