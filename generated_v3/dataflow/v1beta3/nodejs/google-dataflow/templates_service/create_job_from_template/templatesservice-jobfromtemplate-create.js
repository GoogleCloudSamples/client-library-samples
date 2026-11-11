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

// [START dataflow_v1beta3_templatesservice_jobfromtemplate_create]
'use strict';

const {TemplatesServiceClient} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new TemplatesServiceClient();

/**
 * Use the createJobFromTemplate method
 *
 * @param {string} projectId - The ID of the Google Cloud project that the job belongs to.
 * @param {string} locationId - The regional endpoint (for example, 'us-central1') to which to direct the request.
 * @param {string} jobName - The caller-chosen name to use for the created job. Must match '[a-z]([-a-z0-9]{0,1022}[a-z0-9])?'.
 * @param {string} gcsPath - A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL beginning with 'gs://'.
 */
async function createJobFromTemplate(projectId, locationId, jobName, gcsPath) {
  try {
    const request = {
      projectId,
      location: locationId,
      jobName,
      gcsPath,
    };

    const [response] = await client.createJobFromTemplate(request);
    console.log(`Job created with ID: ${response.id}`);
    console.log(`Job status: ${response.currentState}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { createJobFromTemplate };
// [END dataflow_v1beta3_templatesservice_jobfromtemplate_create]
