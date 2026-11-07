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

// [START geminidataanalytics_v1beta_datachatservice_query_data]
'use strict';

const {DataChatServiceClient} = require('@google-cloud/geminidataanalytics').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new DataChatServiceClient();

/**
 * Executes an analytical natural language query using DataChatService.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function queryData(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const prompt = 'What are the top 5 best selling products this month?';

    const tableReference = {
      projectId: projectId,
      datasetId: 'example_dataset',
      tableId: 'example_table',
    };

    const context = {
      datasourceReferences: {
        bq: {
          tableReferences: [tableReference],
        },
      },
    };

    const request = {
      parent,
      prompt,
      context,
    };

    // Send the analytical query request to Gemini Data Analytics.
    const [response] = await client.queryData(request);

    console.log('Query completed successfully.');
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Target resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid request argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for resource access:', err.message);
    } else {
      console.error('Encountered error executing queryData:', err.message || err);
    }
  }
}

module.exports = { queryData };
// [END geminidataanalytics_v1beta_datachatservice_query_data]
