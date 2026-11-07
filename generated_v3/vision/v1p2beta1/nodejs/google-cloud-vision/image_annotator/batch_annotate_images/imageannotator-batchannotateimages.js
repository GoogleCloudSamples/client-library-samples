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

// [START vision_v1p2beta1_imageannotator_batch_annotate_images]
'use strict';

const {ImageAnnotatorClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ImageAnnotatorClient();

/**
 * Annotates images by calling the batchAnnotateImages method.
 */
async function batchAnnotateImages() {
  try {
    const imageSource = {
      imageUri: 'gs://cloud-samples-data/vision/label/setagaya.jpeg',
    };
    const feature = {
      type: 'LABEL_DETECTION',
      maxResults: 5,
    };
    const requests = [
      {
        image: {source: imageSource},
        features: [feature],
      },
    ];

    const [response] = await client.batchAnnotateImages({requests});
    const imageResponses = response.responses || [];

    for (const imageResponse of imageResponses) {
      if (imageResponse.error) {
        console.error(`Image processing error: ${imageResponse.error.message}`);
        continue;
      }

      console.log('Labels:');
      for (const label of imageResponse.labelAnnotations || []) {
        console.log(`- ${label.description} (score: ${label.score})`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error(`Google API error code ${err.code}:`, err.message);
    }
  }
}

module.exports = { batchAnnotateImages };
// [END vision_v1p2beta1_imageannotator_batch_annotate_images]
