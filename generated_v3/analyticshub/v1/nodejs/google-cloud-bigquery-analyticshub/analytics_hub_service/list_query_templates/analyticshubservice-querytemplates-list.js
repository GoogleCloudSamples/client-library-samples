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

// [START analyticshub_v1_analyticshubservice_querytemplates_list]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Lists query templates in an Analytics Hub data exchange.
 *
 * @param {string} projectId - Google Cloud project ID containing the data exchange.
 * @param {string} locationId - Google Cloud region or multi-region of the data exchange (for example, 'us').
 * @param {string} dataExchangeId - ID of the data exchange containing the query templates.
 */
async function listQueryTemplates(projectId, locationId, dataExchangeId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;

    const [queryTemplates] = await client.listQueryTemplates({
      parent,
    });

    console.log(`Listed query templates for ${parent}:`);
    if (queryTemplates.length === 0) {
      console.log('No query templates found.');
    }
    for (const queryTemplate of queryTemplates) {
      console.log(`Query template: ${queryTemplate.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listQueryTemplates };
// [END analyticshub_v1_analyticshubservice_querytemplates_list]
