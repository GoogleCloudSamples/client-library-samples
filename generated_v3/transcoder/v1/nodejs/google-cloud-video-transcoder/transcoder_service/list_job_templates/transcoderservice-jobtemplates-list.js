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

// [START transcoder_v1_transcoderservice_jobtemplates_list]
'use strict';

const {TranscoderServiceClient} = require('@google-cloud/video-transcoder');
const {status} = require('@grpc/grpc-js');

const client = new TranscoderServiceClient();

/**
 * Use the listJobTemplates method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the job templates are located (for example, 'us-central1').
 */
async function listJobTemplates(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [jobTemplates] = await client.listJobTemplates(request);

    console.log('Job templates:');
    for (const template of jobTemplates) {
      console.log(` - ${template.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API call failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listJobTemplates };
// [END transcoder_v1_transcoderservice_jobtemplates_list]
