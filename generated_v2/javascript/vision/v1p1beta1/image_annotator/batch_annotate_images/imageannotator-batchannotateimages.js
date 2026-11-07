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

// [START vision_v1p1beta1_imageannotator_batch_annotate_images]
'use strict';

const {ImageAnnotatorClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ImageAnnotatorClient();

/**
 * Annotates a batch of images using label detection.
 */
async function batchAnnotateImages() {
  try {
    // Keep configuration shallow to comply with depth limits
    const image = {
      source: {imageUri: 'gs://cloud-samples-data/vision/label/setagaya.jpeg'},
    };
    const features = [{type: 'LABEL_DETECTION', maxResults: 5}];
    const requests = [{image, features}];

    const [response] = await client.batchAnnotateImages({requests});

    for (const imageResponse of response.responses) {
      if (imageResponse.error) {
        console.error(`Image annotation error: ${imageResponse.error.message}`);
        continue;
      }
      for (const label of imageResponse.labelAnnotations) {
        console.log(`Label: ${label.description}, Score: ${label.score}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided to the Vision API:', err.message);
    } else if (err.code) {
      console.error(`Vision API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { batchAnnotateImages };
// [END vision_v1p1beta1_imageannotator_batch_annotate_images]
