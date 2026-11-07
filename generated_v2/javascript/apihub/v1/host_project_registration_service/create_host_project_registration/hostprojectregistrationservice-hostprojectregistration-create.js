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

// [START apihub_v1_hostprojectregistrationservice_hostprojectregistration_create]
'use strict';

const {HostProjectRegistrationServiceClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new HostProjectRegistrationServiceClient();

/**
 * Creates a host project registration in API Hub.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where API Hub is provisioned (for example, 'us-central1')
 * @param {string} hostProjectRegistrationId - The ID of the host project registration, which matches the Google Cloud project ID (for example, 'example-host-project-id')
 */
async function createHostProjectRegistration(projectId, locationId, hostProjectRegistrationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;
  const hostProjectRegistration = {
    gcpProject: `projects/${hostProjectRegistrationId}`,
  };

  const request = {
    parent,
    hostProjectRegistrationId,
    hostProjectRegistration,
  };

  let response;
  try {
    [response] = await client.createHostProjectRegistration(request);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS || err.code === 6) {
      [response] = await client.getHostProjectRegistration({
        name: `${parent}/hostProjectRegistrations/${hostProjectRegistrationId}`,
      });
    } else {
      if (err.code === status.PERMISSION_DENIED) {
        console.error(`Permission denied: ${err.message}`);
      } else if (err.code === status.INVALID_ARGUMENT) {
        console.error(`Invalid argument provided: ${err.message}`);
      } else {
        console.error(`API error: ${err.message}`);
      }
      throw err;
    }
  }

  console.log(`Created host project registration: ${response.name}`);
  console.log(`Associated Google Cloud project: ${response.gcpProject}`);
  return response;
}

module.exports = { createHostProjectRegistration };
// [END apihub_v1_hostprojectregistrationservice_hostprojectregistration_create]
