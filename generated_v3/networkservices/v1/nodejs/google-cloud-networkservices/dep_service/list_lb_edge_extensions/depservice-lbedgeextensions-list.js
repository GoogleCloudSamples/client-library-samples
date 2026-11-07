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

// [START networkservices_v1_depservice_lbedgeextensions_list]
'use strict';

const {DepServiceClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new DepServiceClient();

/**
 * Use the listLbEdgeExtensions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 */
async function listLbEdgeExtensions(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [extensions] = await client.listLbEdgeExtensions(request);
    console.log(`Retrieved ${extensions.length} LB edge extension(s).`);
    for (const extension of extensions) {
      console.log(`LB Edge Extension: ${extension.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}:`, err.message);
    } else {
      console.error('Failed to list LB edge extensions:', err);
    }
  }
}

module.exports = { listLbEdgeExtensions };
// [END networkservices_v1_depservice_lbedgeextensions_list]
