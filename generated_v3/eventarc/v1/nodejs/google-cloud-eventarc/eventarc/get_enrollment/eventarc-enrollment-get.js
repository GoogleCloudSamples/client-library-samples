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

// [START eventarc_v1_eventarc_enrollment_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Retrieves an Eventarc enrollment.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the enrollment.
 * @param {string} enrollmentId - The caller-chosen identifier of the existing Eventarc enrollment to retrieve.
 */
async function getEnrollment(projectId, locationId, enrollmentId) {
  const name = `projects/${projectId}/locations/${locationId}/enrollments/${enrollmentId}`;

  try {
    const [enrollment] = await client.getEnrollment({name});

    console.log(`Retrieved enrollment: ${enrollment.name}`);
    console.log(`Message bus: ${enrollment.messageBus}`);
    console.log(`Destination: ${enrollment.destination}`);
    return enrollment;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Enrollment not found at ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing enrollment at ${name}`);
    } else {
      console.error(`Error retrieving enrollment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEnrollment };
// [END eventarc_v1_eventarc_enrollment_get]
