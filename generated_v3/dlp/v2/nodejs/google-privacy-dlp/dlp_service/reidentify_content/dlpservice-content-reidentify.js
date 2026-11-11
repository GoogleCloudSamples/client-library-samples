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

// [START dlp_v2_dlpservice_reidentify_content]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Re-identify previously de-identified content using deterministic encryption.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function reidentifyContent(projectId) {
  try {
    const parent = `projects/${projectId}`;

    const surrogateInfoType = {
      name: 'EMAIL_ADDRESS_TOKEN',
    };

    // A 128-bit unwrapped AES key used for deterministic encryption and decryption
    const cryptoKey = {
      unwrapped: {
        key: Buffer.from('example-key-128b'),
      },
    };

    const cryptoDeterministicConfig = {
      cryptoKey,
      surrogateInfoType,
    };

    // De-identify the content first to generate a valid encrypted surrogate token
    const deidentifyTransformation = {
      primitiveTransformation: {
        cryptoDeterministicConfig,
      },
      infoTypes: [{name: 'EMAIL_ADDRESS'}],
    };

    const deidentifyConfig = {
      infoTypeTransformations: {
        transformations: [deidentifyTransformation],
      },
    };

    const deidentifyInspectConfig = {
      infoTypes: [{name: 'EMAIL_ADDRESS'}],
    };

    const [deidentifiedResponse] = await client.deidentifyContent({
      parent,
      deidentifyConfig,
      inspectConfig: deidentifyInspectConfig,
      item: {
        value: 'Contact support at example@example.com',
      },
    });

    // Re-identify the surrogate token back to the original plaintext content
    const reidentifyTransformation = {
      primitiveTransformation: {
        cryptoDeterministicConfig,
      },
      infoTypes: [surrogateInfoType],
    };

    const reidentifyConfig = {
      infoTypeTransformations: {
        transformations: [reidentifyTransformation],
      },
    };

    const reidentifyInspectConfig = {
      customInfoTypes: [
        {
          infoType: surrogateInfoType,
          surrogateType: {},
        },
      ],
    };

    const request = {
      parent,
      reidentifyConfig,
      inspectConfig: reidentifyInspectConfig,
      item: deidentifiedResponse.item,
    };

    const [response] = await client.reidentifyContent(request);
    console.log(`Re-identified content: ${response.item?.value}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`API error with gRPC status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { reidentifyContent };
// [END dlp_v2_dlpservice_reidentify_content]
