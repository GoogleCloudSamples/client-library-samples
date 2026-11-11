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

// [START datastream_v1_datastream_fetch_static_ips]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Fetches static IP addresses for a Datastream location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function fetchStaticIps(projectId, locationId) {
  try {
    // Construct the resource name for the target location
    const name = client.locationPath(projectId, locationId);

    const request = {
      name,
    };

    const [staticIps] = await client.fetchStaticIps(request);

    console.log(`Static IP addresses for location ${name}:`);
    for (const ip of staticIps) {
      console.log(ip);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { fetchStaticIps };
// [END datastream_v1_datastream_fetch_static_ips]
