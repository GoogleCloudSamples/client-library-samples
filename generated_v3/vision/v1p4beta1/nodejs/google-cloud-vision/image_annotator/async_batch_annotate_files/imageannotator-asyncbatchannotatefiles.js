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

// [START vision_v1p4beta1_imageannotator_async_batch_annotate_files]
'use strict';

const {ImageAnnotatorClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ImageAnnotatorClient();

/**
 * Use the asyncBatchAnnotateFiles method
 *
 * @param {string} gcsSourceUri - Google Cloud Storage URI of the input file (for example, 'gs://example-bucket/example.pdf').
 * @param {string} gcsDestinationUri - Google Cloud Storage URI prefix where annotation results will be stored (for example, 'gs://example-bucket/output/').
 */
async function asyncBatchAnnotateFiles(gcsSourceUri, gcsDestinationUri) {
  try {
    const inputConfig = {
      gcsSource: {
        uri: gcsSourceUri,
      },
      mimeType: 'application/pdf',
    };

    const features = [
      {
        type: 'DOCUMENT_TEXT_DETECTION',
      },
    ];

    const outputConfig = {
      gcsDestination: {
        uri: gcsDestinationUri,
      },
    };

    const requests = [
      {
        inputConfig,
        features,
        outputConfig,
      },
    ];

    const [operation] = await client.asyncBatchAnnotateFiles({requests});
    console.log('Waiting for the batch file annotation operation to complete...');

    const [filesResponse] = await operation.promise();

    console.log('Batch file annotation completed successfully.');
    if (filesResponse.responses) {
      for (const response of filesResponse.responses) {
        if (response.outputConfig && response.outputConfig.gcsDestination) {
          console.log(`Results saved to: ${response.outputConfig.gcsDestination.uri}`);
        }
      }
    }
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { asyncBatchAnnotateFiles };
// [END vision_v1p4beta1_imageannotator_async_batch_annotate_files]
