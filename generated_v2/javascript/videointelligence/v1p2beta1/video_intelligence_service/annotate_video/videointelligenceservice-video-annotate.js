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

// [START videointelligence_v1p2beta1_videointelligenceservice_annotate_video]
'use strict';

const {VideoIntelligenceServiceClient} = require('@google-cloud/video-intelligence');
const {status} = require('@grpc/grpc-js');

const client = new VideoIntelligenceServiceClient();

/**
 * Use the annotateVideo method
 *
 * @param {string} inputUri - Google Cloud Storage URI of the input video in the format 'gs://bucket-id/object-id'.
 */
async function annotateVideo(inputUri) {
  try {
    const features = ['LABEL_DETECTION'];

    const request = {
      inputUri,
      features,
    };

    // Execute the long-running video annotation request
    const [operation] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');

    const [operationResult] = await operation.promise();
    const annotations = operationResult.annotationResults[0];

    const labels = annotations.segmentLabelAnnotations || [];
    for (const label of labels) {
      console.log(`Label: ${label.entity.description}`);
      for (const segment of label.segments || []) {
        const start = segment.segment.startTimeOffset.seconds || 0;
        const end = segment.segment.endTimeOffset.seconds || 0;
        console.log(`  Segment: ${start}s to ${end}s`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { annotateVideo };
// [END videointelligence_v1p2beta1_videointelligenceservice_annotate_video]
