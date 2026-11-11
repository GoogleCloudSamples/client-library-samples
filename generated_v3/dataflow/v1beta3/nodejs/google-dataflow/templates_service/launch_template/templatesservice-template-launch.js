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

// [START dataflow_v1beta3_templatesservice_launch_template]
'use strict';

const {TemplatesServiceClient} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new TemplatesServiceClient();

/**
 * Use the launchTemplate method
 *
 * @param {string} projectId - The ID of the Google Cloud Platform project that the job belongs to.
 * @param {string} locationId - The regional endpoint to which to direct the request (e.g., 'us-central1').
 * @param {string} gcsPath - A Cloud Storage path to the template to use to create the job, beginning with 'gs://'.
 */
async function launchTemplate(projectId, locationId, gcsPath) {
  try {
    const launchParameters = {
      jobName: 'example-template-job',
    };

    const request = {
      projectId,
      location: locationId,
      gcsPath,
      launchParameters,
    };

    const [response] = await client.launchTemplate(request);
    console.log(`Launched template job ID: ${response.job?.id}`);
    console.log(`Job state: ${response.job?.currentState}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Template or resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for launch request:', err.message);
    } else {
      console.error(`API error (code ${err.code}):`, err.message);
    }
  }
}

module.exports = { launchTemplate };
// [END dataflow_v1beta3_templatesservice_launch_template]
