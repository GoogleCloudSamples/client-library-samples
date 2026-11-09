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

// [START dataform_v1beta1_dataform_query_user_root_contents]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the queryUserRootContents method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} location - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function queryUserRootContents(projectId, locationId, location) {
  try {
    const formattedLocation = client.locationPath(projectId, locationId);
    const request = {
      location: formattedLocation,
    };

    const [response] = await client.queryUserRootContents(request);
    console.log(`Retrieved root contents for location: ${locationId}`);
    if (response.directoryEntries) {
      for (const entry of response.directoryEntries) {
        console.log(`Path: ${entry.path}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for location: ${locationId}`);
    } else {
      console.error(`Failed to query user root contents: ${err.message}`);
    }
  }
}

module.exports = { queryUserRootContents };
// [END dataform_v1beta1_dataform_query_user_root_contents]
