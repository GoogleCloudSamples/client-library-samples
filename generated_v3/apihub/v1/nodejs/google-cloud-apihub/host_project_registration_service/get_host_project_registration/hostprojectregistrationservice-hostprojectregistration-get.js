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

// [START apihub_v1_hostprojectregistrationservice_hostprojectregistration_get]
'use strict';

const {HostProjectRegistrationServiceClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new HostProjectRegistrationServiceClient();

/**
 * Use the getHostProjectRegistration method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} hostProjectRegistrationId - The ID of the host project registration to retrieve. This identifier is caller-specified upon creation (matching the GCP project ID of the host project being registered) or obtained from an existing HostProjectRegistration resource.
 */
async function getHostProjectRegistration(projectId, locationId, hostProjectRegistrationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/hostProjectRegistrations/${hostProjectRegistrationId}`;

    const [response] = await client.getHostProjectRegistration({
      name,
    });

    console.log(`Host project registration: ${response.name}`);
    console.log(`Associated GCP project: ${response.gcpProject}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Host project registration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing host project registration: ${err.message}`);
    } else {
      console.error(`Failed to retrieve host project registration: ${err.message}`);
    }
  }
}

module.exports = { getHostProjectRegistration };
// [END apihub_v1_hostprojectregistrationservice_hostprojectregistration_get]
