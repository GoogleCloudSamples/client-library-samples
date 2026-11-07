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

// [START composer_v1_imageversions_imageversions_list]
'use strict';

const {ImageVersionsClient} = require('@google-cloud/orchestration-airflow');
const {status} = require('@grpc/grpc-js');

const client = new ImageVersionsClient();

/**
 * Lists supported Cloud Composer image versions for a location.
 */
async function listImageVersions() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    // Retrieve supported Cloud Composer image versions for the specified location
    const [response] = await client.listImageVersions(request);
    for (const imageVersion of response) {
      console.log(`Image Version: ${imageVersion.imageVersionId}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Requested resource location was not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Insufficient permissions to list image versions:', err.message);
    } else {
      console.error('Failed to list image versions:', err.message || err);
    }
  }
}

module.exports = { listImageVersions };
// [END composer_v1_imageversions_imageversions_list]
