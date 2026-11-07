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

// [START networkservices_v1_networkservices_httproutes_list]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Lists HTTP routes in a specified project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location_id - The Google Cloud location (for example, 'global' or 'us-central1').
 */
async function listHttpRoutes(project_id, location_id) {
  try {
    const parent = `projects/${project_id}/locations/${location_id}`;
    const request = {
      parent,
    };

    const [routes] = await client.listHttpRoutes(request);

    if (!routes || routes.length === 0) {
      console.log('No HTTP routes found.');
      return;
    }

    for (const route of routes) {
      console.log(`Route: ${route.name}`);
      console.log(`Hostnames: ${route.hostnames ? route.hostnames.join(', ') : 'none'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listHttpRoutes };
// [END networkservices_v1_networkservices_httproutes_list]
