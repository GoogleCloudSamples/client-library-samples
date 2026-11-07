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

// [START discoveryengine_v1_projectservice_provision_project]
'use strict';

const {ProjectServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new ProjectServiceClient();

/**
 * Use the provisionProject method
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function provisionProject(projectId) {
  try {
    const dataUseTermsVersion = '2022-11-23';
    const acceptDataUseTerms = true;
    const name = `projects/${projectId}`;

    const request = {
      name,
      acceptDataUseTerms,
      dataUseTermsVersion,
    };

    const [operation] = await client.provisionProject(request);
    const [response] = await operation.promise();

    console.log(`Project provisioned successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Project is already provisioned: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error encountered:', err);
    }
  }
}

module.exports = { provisionProject };
// [END discoveryengine_v1_projectservice_provision_project]
