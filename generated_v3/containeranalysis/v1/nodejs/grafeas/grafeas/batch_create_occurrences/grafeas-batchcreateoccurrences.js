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

// [START containeranalysis_v1_grafeas_occurrences_batchcreate]
'use strict';

const {GrafeasClient} = require('@google-cloud/grafeas');
const {status} = require('@grpc/grpc-js');

const client = new GrafeasClient();

/**
 * Use the batchCreateOccurrences method
 *
 * @param {string} projectId - The Google Cloud project ID. Caller-supplied identifier.
 */
async function batchCreateOccurrences(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const occurrences = [
      {
        resourceUri: `https://gcr.io/${projectId}/example-image@sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`,
        noteName: `projects/${projectId}/notes/example-note`,
        attestation: {
          serializedPayload: Buffer.from('example-serialized-payload'),
        },
      },
    ];

    const [response] = await client.batchCreateOccurrences({
      parent,
      occurrences,
    });

    console.log(`Created ${response.occurrences.length} occurrences:`);
    for (const occurrence of response.occurrences) {
      console.log(`- Name: ${occurrence.name}`);
      console.log(`  Resource: ${occurrence.resourceUri}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Occurrence already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Referenced project or note not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { batchCreateOccurrences };
// [END containeranalysis_v1_grafeas_occurrences_batchcreate]
