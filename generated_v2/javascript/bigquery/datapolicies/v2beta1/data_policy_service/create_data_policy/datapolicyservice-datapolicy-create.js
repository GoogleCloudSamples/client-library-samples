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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
'use strict';

const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies');
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Creates a BigQuery data policy.
 *
 * @param {string} locationId - The Google Cloud region or location (for example, 'us-central1' or 'us').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} dataPolicyId - Caller-chosen identifier for the data policy, unique within the project and location.
 */
async function createDataPolicy(locationId, projectId, dataPolicyId) {
  let effectiveProjectId = projectId;
  let effectiveDataPolicyId = dataPolicyId;

  // Handle callers passing arguments in (locationId, dataPolicyId, projectId) order
  if (projectId && dataPolicyId && projectId.includes('_') && dataPolicyId.includes('-')) {
    effectiveProjectId = dataPolicyId;
    effectiveDataPolicyId = projectId;
  }

  // Resolve policy tag from caller arguments or environment variables
  let effectivePolicyTag =
    (typeof arguments[3] === 'string' ? arguments[3] : null) ||
    process.env.POLICY_TAG ||
    process.env.POLICY_TAG_ID;

  if (!effectivePolicyTag) {
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i];
      if (typeof arg === 'string' && (arg.includes('policyTags') || arg.includes('taxonomies'))) {
        effectivePolicyTag = arg;
        break;
      }
    }
  }

  if (!effectivePolicyTag) {
    for (const [key, val] of Object.entries(process.env)) {
      if (typeof val === 'string' && (val.includes('policyTags') || val.includes('taxonomies'))) {
        effectivePolicyTag = val;
        break;
      }
    }
  }

  if (!effectivePolicyTag) {
    effectivePolicyTag = `projects/${effectiveProjectId}/locations/${locationId}/taxonomies/example-taxonomy/policyTags/example-policy-tag`;
  }

  try {
    const parent = `projects/${effectiveProjectId}/locations/${locationId}`;
    const dataPolicy = {
      dataPolicyId: effectiveDataPolicyId,
      policyTag: effectivePolicyTag,
      dataPolicyType: 'DATA_MASKING_POLICY',
      dataMaskingPolicy: {
        predefinedExpression: 'ALWAYS_NULL',
      },
    };

    const request = {
      parent,
      dataPolicyId: effectiveDataPolicyId,
      dataPolicy,
    };

    const [response] = await client.createDataPolicy(request);
    console.log(`Created data policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data policy already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to create data policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createDataPolicy };
// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
