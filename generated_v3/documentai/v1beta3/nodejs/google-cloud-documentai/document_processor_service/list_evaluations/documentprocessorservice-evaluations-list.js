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

// [START documentai_v1beta3_documentprocessorservice_evaluations_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the listEvaluations method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location where the processor exists (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor (for example, '8c79b9b1d983fb05'). Obtain this from an existing processor using ListProcessors.
 * @param {string} processorVersionId - The server-generated ID of the processor version (for example, 'pretrained-foundation-model-v1.0'). Obtain this from ListProcessorVersions.
 */
async function listEvaluations(projectId, locationId, processorId, processorVersionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/processors/${processorId}/processorVersions/${processorVersionId}`;

    const request = {
      parent,
    };

    const [evaluations] = await client.listEvaluations(request);

    console.log(`Evaluations retrieved for ${parent}:`);
    for (const evaluation of evaluations) {
      console.log(`Evaluation name: ${evaluation.name}`);
      console.log(`Create time: ${evaluation.createTime?.seconds}`);
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
// [END documentai_v1beta3_documentprocessorservice_evaluations_list]
