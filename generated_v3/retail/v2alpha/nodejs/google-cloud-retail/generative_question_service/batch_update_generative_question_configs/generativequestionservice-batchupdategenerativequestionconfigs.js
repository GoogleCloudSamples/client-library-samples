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

// [START retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
'use strict';

const {GenerativeQuestionServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

const client = new GenerativeQuestionServiceClient();

/**
 * Use the batchUpdateGenerativeQuestionConfigs method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID. For Google Cloud Retail, use 'global'.
 * @param {string} catalogId - The Retail catalog ID. Use 'default_catalog' for the default catalog.
 */
async function batchUpdateGenerativeQuestionConfigs(projectId, locationId, catalogId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}`;

    const generativeQuestionConfig = {
      catalog: parent,
      facet: 'brand',
      allowedInConversation: true,
    };

    const requests = [
      {
        generativeQuestionConfig,
        updateMask: {
          paths: ['allowed_in_conversation'],
        },
      },
    ];

    const request = {
      parent,
      requests,
    };

    const [response] = await client.batchUpdateGenerativeQuestionConfigs(request);

    console.log(`Updated ${response.generativeQuestionConfigs.length} generative question configuration(s).`);
    for (const config of response.generativeQuestionConfigs) {
      console.log(`- Facet: ${config.facet}, Allowed in conversation: ${config.allowedInConversation}`);
    }
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API Error [${err.code}]: ${err.details || err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { batchUpdateGenerativeQuestionConfigs };
// [END retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
