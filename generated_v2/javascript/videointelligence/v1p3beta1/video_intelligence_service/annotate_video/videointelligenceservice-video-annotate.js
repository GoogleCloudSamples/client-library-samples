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

// [START videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
'use strict';

const {VideoIntelligenceServiceClient} = require('@google-cloud/video-intelligence');
const {status} = require('@grpc/grpc-js');

const client = new VideoIntelligenceServiceClient();

/**
 * Use the annotateVideo method
 *
 * @param {string} inputUri - Google Cloud Storage URI of the video to annotate, in the format `gs://bucket-id/object-id`.
 */
async function annotateVideo(inputUri) {
  try {
    const features = ['LABEL_DETECTION'];
    const request = {
      inputUri,
      features,
    };

    // Initiate the long-running video annotation operation
    const [operation] = await client.annotateVideo(request);
    const [operationResult] = await operation.promise();

    const annotations = operationResult.annotationResults[0];
    const labels = annotations.segmentLabelAnnotations || [];

    for (const label of labels) {
      console.log(`Label: ${label.entity.description}`);
    }
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.NOT_FOUND ||
      err.code === status.PERMISSION_DENIED
    ) {
      console.error(`API request error (${err.code}): ${err.message}`);
    } else if (typeof err.code === 'number' && Object.values(status).includes(err.code)) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { annotateVideo };
// [END videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
