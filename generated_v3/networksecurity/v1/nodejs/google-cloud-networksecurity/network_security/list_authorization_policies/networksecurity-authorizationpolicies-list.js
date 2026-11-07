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

// [START networksecurity_v1_networksecurity_authorizationpolicies_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Lists authorization policies in a specified project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} location_id - The Google Cloud region or 'global' (for example, 'global')
 */
async function listAuthorizationPolicies(project_id, location_id) {
  try {
    let projectId = project_id;
    let locationId = location_id;

    if (typeof project_id === 'object' && project_id !== null) {
      projectId = project_id.project_id || project_id.projectId;
      locationId = project_id.location_id || project_id.locationId;
    }

    projectId =
      projectId ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.PROJECT_ID ||
      process.env.GCLOUD_PROJECT;

    if (!projectId && typeof client.getProjectId === 'function') {
      projectId = await client.getProjectId();
    }

    locationId = locationId || process.env.LOCATION_ID || 'global';

    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [policies] = await client.listAuthorizationPolicies(request);

    if (!policies || policies.length === 0) {
      console.log(`No authorization policies found in ${parent}.`);
      return;
    }

    for (const policy of policies) {
      console.log(`Authorization Policy: ${policy.name}`);
      console.log(`Action: ${policy.action}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listAuthorizationPolicies };
// [END networksecurity_v1_networksecurity_authorizationpolicies_list]
