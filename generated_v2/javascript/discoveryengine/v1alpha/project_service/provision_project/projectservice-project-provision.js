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

// [START discoveryengine_v1alpha_projectservice_provision_project]
'use strict';

const {ProjectServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new ProjectServiceClient();

/**
 * Provisions a Google Cloud project for Discovery Engine.
 */
async function provisionProject() {
  try {
    const projectIdOrNumber =
      (typeof arguments[0] === 'string'
        ? arguments[0].replace(/^projects\//, '')
        : null) ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.PROJECT_ID ||
      (await client.getProjectId().catch(() => 'example-project-id-or-number'));
    const name = `projects/${projectIdOrNumber}`;
    const acceptDataUseTerms = true;
    const dataUseTermsVersion =
      process.env.DATA_USE_TERMS_VERSION || '2022-11-23';

    const request = {
      name,
      acceptDataUseTerms,
      dataUseTermsVersion,
    };

    // Submits the provisioning request and waits for the long-running operation to complete.
    const [operation] = await client.provisionProject(request);
    const [response] = await operation.promise();

    console.log(`Provisioned project: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Project already provisioned: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Project provisioning precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error provisioning project: ${err.message}`);
    }
  }
}

module.exports = { provisionProject };
// [END discoveryengine_v1alpha_projectservice_provision_project]
