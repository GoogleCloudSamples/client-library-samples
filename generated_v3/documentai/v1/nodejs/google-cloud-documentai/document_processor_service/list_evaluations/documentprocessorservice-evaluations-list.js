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

// [START documentai_v1_documentprocessorservice_evaluations_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Lists evaluations for a specified processor version.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the processor is hosted (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor (for example, 'b26e033d4567abcd').
 * @param {string} processorVersionId - The ID of the processor version (for example, 'rc').
 */
async function listEvaluations(projectId, locationId, processorId, processorVersionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/processors/${processorId}/processorVersions/${processorVersionId}`;

    const request = {
      parent,
    };

    const [evaluations] = await client.listEvaluations(request);

    if (evaluations.length === 0) {
      console.log('No evaluations found.');
      return;
    }

    for (const evaluation of evaluations) {
      console.log(`Evaluation name: ${evaluation.name}`);
      console.log(`Create time: ${JSON.stringify(evaluation.createTime)}`);
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
// [END documentai_v1_documentprocessorservice_evaluations_list]
