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

// [START confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]
'use strict';

const {ConfidentialComputingClient} = require('@google-cloud/confidentialcomputing');
const {status} = require('@grpc/grpc-js');

const client = new ConfidentialComputingClient();

/**
 * Use the createChallenge method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createChallenge(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const challenge = {};

    const [response] = await client.createChallenge({
      parent,
      challenge,
    });

    console.log(`Created challenge: ${response.name}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Failed to create challenge:', err);
    }
  }
}

module.exports = { createChallenge };
// [END confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]
