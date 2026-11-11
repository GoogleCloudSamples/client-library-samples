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

// [START datastream_v1alpha1_datastream_fetch_static_ips]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Use the fetchStaticIps method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function fetchStaticIps(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;
    const [response] = await client.fetchStaticIps({name});
    const staticIps = Array.isArray(response) ? response : (response.staticIps || []);

    console.log(`Static IPs for location ${name}:`);
    for (const ip of staticIps) {
      console.log(ip);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { fetchStaticIps };
// [END datastream_v1alpha1_datastream_fetch_static_ips]
