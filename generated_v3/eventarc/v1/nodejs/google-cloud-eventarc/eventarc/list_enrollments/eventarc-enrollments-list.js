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

// [START eventarc_v1_eventarc_enrollments_list]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Lists Eventarc enrollments in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'us-central1' or 'global').
 */
async function listEnrollments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [enrollments] = await client.listEnrollments({
      parent,
    });

    for (const enrollment of enrollments) {
      console.log(`Enrollment: ${enrollment.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { listEnrollments };
// [END eventarc_v1_eventarc_enrollments_list]
