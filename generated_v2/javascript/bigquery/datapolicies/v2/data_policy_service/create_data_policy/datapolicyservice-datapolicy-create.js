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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
'use strict';

const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies');
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Creates a BigQuery data policy.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} dataPolicyId - ID of the DataPolicy (for example, 'example_datapolicy_id')
 */
async function createDataPolicy(locationId, dataPolicyId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = `projects/${projectNumber}/locations/${locationId}`;
    const dataPolicy = {
      dataPolicyId: dataPolicyId.replace(/-/g, '_'),
      dataPolicyType: 'DATA_MASKING_POLICY',
      policyTag: `projects/${projectNumber}/locations/${locationId}/taxonomies/example-taxonomy-id/policyTags/example-policytag-id`,
      dataMaskingPolicy: {
        predefinedExpression: 'SHA256',
      },
    };

    const request = {
      parent,
      dataPolicy,
    };

    const [response] = await client.createDataPolicy(request);
    console.log(`Created data policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create data policy: ${err.message}`);
    }
  }
}

module.exports = { createDataPolicy };
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
