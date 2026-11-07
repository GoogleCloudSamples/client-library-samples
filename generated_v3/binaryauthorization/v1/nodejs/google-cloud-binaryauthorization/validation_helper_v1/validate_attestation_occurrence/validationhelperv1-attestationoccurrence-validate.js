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

// [START binaryauthorization_v1_validationhelperv1_validate_attestation_occurrence]
'use strict';

const {ValidationHelperV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new ValidationHelperV1Client();

/**
 * Use the validateAttestationOccurrence method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} attestorId - The ID of the Attestor (for example, 'example-attestor-id').
 */
async function validateAttestationOccurrence(projectId, attestorId) {
  try {
    const occurrenceResourceUri =
      'gcr.io/example-project/example-image@sha256:7216dd52d08a5436a1eab613424f48d82d431498379b665a278e14716f4cd035';
    const attestation = {
      serializedPayload: Buffer.from('example-payload'),
      signatures: [
        {
          publicKeyId: 'example-key-id',
          signature: Buffer.from('example-signature'),
        },
      ],
    };
    const attestor = `projects/${projectId}/attestors/${attestorId}`;
    const occurrenceNote = `projects/${projectId}/notes/example-note-id`;

    const request = {
      attestor,
      attestation,
      occurrenceNote,
      occurrenceResourceUri,
    };

    const [response] = await client.validateAttestationOccurrence(request);
    console.log(`Validation result: ${response.result}`);
    if (response.denialReason) {
      console.log(`Denial reason: ${response.denialReason}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC failed with status ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { validateAttestationOccurrence };
// [END binaryauthorization_v1_validationhelperv1_validate_attestation_occurrence]
