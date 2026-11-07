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

// [START workloadidentity_v1_workloadidentity_generate_service_agents]
'use strict';

const {WorkloadIdentityClient} = require('@google-cloud/workloadidentity');
const {GoogleAuth} = require('google-auth-library');
const {status} = require('@grpc/grpc-js');

const client = new WorkloadIdentityClient();

/**
 * Generates service agents for a service producer in a project.
 *
 * @param {string} projectId - The Google Cloud project ID or project number.
 * @param {string} locationId - The Google Cloud location ID. The service requires this to be 'global'.
 * @param {string} serviceProducerId - The service producer identifier, such as 'bigquery.googleapis.com'.
 */
async function generateServiceAgents(projectId, locationId, serviceProducerId) {
  try {
    let projectIdentifier =
      process.env.GOOGLE_CLOUD_PROJECT_NUMBER ||
      process.env.PROJECT_NUMBER ||
      projectId;

    // The API requires a numeric project number in the resource path container ID.
    if (!/^\d+$/.test(projectIdentifier)) {
      try {
        const auth = new GoogleAuth({
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        const authClient = await auth.getClient();
        const res = await authClient.request({
          url: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`,
        });
        if (res.data && res.data.projectNumber) {
          projectIdentifier = res.data.projectNumber;
        }
      } catch {
        // Fall back to projectId if numeric resolution is unavailable.
      }
    }

    const parent = `projects/${projectIdentifier}/locations/${locationId}/serviceProducers/${serviceProducerId}`;

    const [operation] = await client.generateServiceAgents({
      parent,
    });
    const [response] = await operation.promise();

    console.log('Generated service agents:', JSON.stringify(response));
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { generateServiceAgents };
// [END workloadidentity_v1_workloadidentity_generate_service_agents]
