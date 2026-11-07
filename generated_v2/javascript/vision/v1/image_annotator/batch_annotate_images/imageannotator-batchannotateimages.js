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

// [START vision_v1_imageannotator_batch_annotate_images]
'use strict';

const {ImageAnnotatorClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ImageAnnotatorClient();

/**
 * Performs batch image annotation using Cloud Vision.
 */
async function batchAnnotateImages() {
  try {
    const imageSource = {
      imageUri: 'gs://cloud-samples-data/vision/label/wakeupcat.jpg',
    };
    const features = [
      {
        type: 'LABEL_DETECTION',
        maxResults: 5,
      },
    ];
    const requests = [
      {
        image: {source: imageSource},
        features,
      },
    ];

    const [response] = await client.batchAnnotateImages({requests});

    for (const annotateResponse of response.responses) {
      if (annotateResponse.error) {
        console.error(`Image annotation error: ${annotateResponse.error.message}`);
        continue;
      }
      for (const label of annotateResponse.labelAnnotations || []) {
        console.log(`Label: ${label.description}, Score: ${label.score}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {batchAnnotateImages};
// [END vision_v1_imageannotator_batch_annotate_images]
