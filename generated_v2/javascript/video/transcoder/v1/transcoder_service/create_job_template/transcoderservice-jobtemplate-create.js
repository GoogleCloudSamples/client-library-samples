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

// [START transcoder_v1_transcoderservice_jobtemplate_create]
'use strict';

const {TranscoderServiceClient} = require('@google-cloud/video-transcoder');
const {status} = require('@grpc/grpc-js');

const client = new TranscoderServiceClient();

/**
 * Use the createJobTemplate method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobTemplateId - ID of the JobTemplate (for example, 'example-jobtemplate-id')
 */
async function createJobTemplate(projectId, locationId, jobTemplateId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const h264Config = {
      heightPixels: 360,
      widthPixels: 640,
      bitrateBps: 550000,
      frameRate: 60,
    };

    const videoStream = {
      h264: h264Config,
    };

    const audioStream = {
      codec: 'aac',
      bitrateBps: 64000,
    };

    const jobTemplate = {
      config: {
        elementaryStreams: [
          {key: 'video-stream0', videoStream},
          {key: 'audio-stream0', audioStream},
        ],
        muxStreams: [
          {
            key: 'sd',
            container: 'mp4',
            elementaryStreams: ['video-stream0', 'audio-stream0'],
          },
        ],
      },
    };

    const [response] = await client.createJobTemplate({
      parent,
      jobTemplateId,
      jobTemplate,
    });

    console.log(`Created job template: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job template already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Transcoder API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createJobTemplate };
// [END transcoder_v1_transcoderservice_jobtemplate_create]
