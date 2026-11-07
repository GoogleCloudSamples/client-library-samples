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

// [START transcoder_v1_transcoderservice_jobtemplate_delete]
'use strict';

const {TranscoderServiceClient} = require('@google-cloud/video-transcoder');
const {status} = require('@grpc/grpc-js');

/**
 * Delete a job template in the Transcoder API.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobTemplateId - ID of the JobTemplate (for example, 'example-jobtemplate-id')
 */
async function deleteJobTemplate(projectId, locationId, jobTemplateId) {
  const transcoderServiceClient = new TranscoderServiceClient();

  const name = transcoderServiceClient.jobTemplatePath(
    projectId,
    locationId,
    jobTemplateId
  );

  const request = {
    name,
  };

  try {
    await transcoderServiceClient.deleteJobTemplate(request);
    console.log(`Deleted job template: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Job template not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when deleting job template.');
    } else {
      console.error(`Failed to delete job template: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteJobTemplate };
// [END transcoder_v1_transcoderservice_jobtemplate_delete]
