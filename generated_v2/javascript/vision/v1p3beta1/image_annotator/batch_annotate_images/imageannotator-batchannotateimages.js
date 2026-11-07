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

// [START vision_v1p3beta1_imageannotator_batch_annotate_images]
'use strict';

const {ImageAnnotatorClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ImageAnnotatorClient();

/**
 * Annotates an image from Cloud Storage using label detection.
 */
async function batchAnnotateImages() {
  try {
    const image = {
      source: {
        imageUri: 'gs://cloud-samples-data/vision/label/setagaya.jpeg',
      },
    };
    const features = [
      {
        type: 'LABEL_DETECTION',
      },
    ];
    const requests = [
      {
        image,
        features,
      },
    ];

    const [response] = await client.batchAnnotateImages({requests});

    for (const annotateResponse of response.responses) {
      if (annotateResponse.error) {
        console.error(`Annotation error: ${annotateResponse.error.message}`);
        continue;
      }
      for (const label of annotateResponse.labelAnnotations) {
        console.log(`Label: ${label.description}, Score: ${label.score}`);
      }
    }
  } catch (err) {
    if (typeof err.code === 'number' && Object.values(status).includes(err.code)) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { batchAnnotateImages };
// [END vision_v1p3beta1_imageannotator_batch_annotate_images]
