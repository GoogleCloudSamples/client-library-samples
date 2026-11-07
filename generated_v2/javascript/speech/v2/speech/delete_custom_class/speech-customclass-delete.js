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

// [START speech_v2_speech_customclass_delete]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a custom class.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} customClassId - The ID of the CustomClass to delete.
 */
async function deleteCustomClass(projectId, locationId, customClassId) {
  const client = new SpeechClient({
    apiEndpoint:
      locationId === 'global'
        ? 'speech.googleapis.com'
        : `${locationId}-speech.googleapis.com`,
  });

  try {
    const name = `projects/${projectId}/locations/${locationId}/customClasses/${customClassId}`;

    // DeleteCustomClass initiates a long-running operation.
    const [operation] = await client.deleteCustomClass({name});

    // Wait for the deletion operation to complete.
    const [response] = await operation.promise();

    console.log(`Deleted custom class: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Custom class not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Custom class is not in an active state: ${err.message}`);
    } else {
      console.error(`Failed to delete custom class: ${err.message}`);
    }
  }
}

module.exports = {deleteCustomClass};
// [END speech_v2_speech_customclass_delete]
