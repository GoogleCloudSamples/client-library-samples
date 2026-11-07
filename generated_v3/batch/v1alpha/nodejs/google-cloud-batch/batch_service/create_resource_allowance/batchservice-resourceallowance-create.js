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

// [START batch_v1alpha_batchservice_resourceallowance_create]
'use strict';

const {v1alpha} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha.BatchServiceClient();

/**
 * Creates a Batch resource allowance in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} resourceAllowanceId - The client-assigned ID to use for the resource allowance (for example, 'example-resource-allowance'). Must contain 1-63 characters, begin with a lowercase letter, and consist of lowercase letters, numbers, and hyphens.
 */
async function createResourceAllowance(projectId, locationId, resourceAllowanceId) {
  try {
    // Form the parent resource path
    const parent = `projects/${projectId}/locations/${locationId}`;

    // Define the resource allowance consumption limit
    const limit = {
      calendarPeriod: 'MONTH',
      limit: 10000.0,
    };

    // Configure the usage allowance specification
    const usageResourceAllowance = {
      spec: {
        type: 'cpu-core-hours',
        limit,
      },
    };

    // Build the resource allowance definition
    const resourceAllowance = {
      usageResourceAllowance,
    };

    const request = {
      parent,
      resourceAllowanceId,
      resourceAllowance,
    };

    const [response] = await client.createResourceAllowance(request);
    console.log(`Created resource allowance: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Resource allowance already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createResourceAllowance };
// [END batch_v1alpha_batchservice_resourceallowance_create]
