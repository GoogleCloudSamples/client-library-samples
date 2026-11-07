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

// [START workloadmanager_v1_workloadmanager_evaluations_list]
'use strict';

const {WorkloadManagerClient} = require('@google-cloud/workloadmanager');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadManagerClient();

/**
 * Lists evaluations in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the evaluations.
 * @param {string} locationId - The target Google Cloud location or region for the evaluations.
 */
async function listEvaluations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [evaluations] = await client.listEvaluations(request);
    for (const evaluation of evaluations) {
      console.log(`Evaluation: ${evaluation.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listEvaluations };
// [END workloadmanager_v1_workloadmanager_evaluations_list]
