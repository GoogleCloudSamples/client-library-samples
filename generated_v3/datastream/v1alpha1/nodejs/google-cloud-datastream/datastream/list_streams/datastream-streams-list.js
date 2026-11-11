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

// [START datastream_v1alpha1_datastream_streams_list]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Use the listStreams method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'us-central1').
 */
async function listStreams(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const request = {
      parent,
    };

    // Retrieve the list of streams within the specified location
    const [streams] = await client.listStreams(request);

    if (streams.length === 0) {
      console.log(`No streams found in ${parent}.`);
      return;
    }

    console.log(`Found ${streams.length} stream(s) in ${parent}:`);
    for (const stream of streams) {
      console.log(`- Name: ${stream.name}`);
      console.log(`  Display Name: ${stream.displayName}`);
      console.log(`  State: ${stream.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing: ${parent}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list streams: ${err.message}`);
    }
  }
}

module.exports = { listStreams };
// [END datastream_v1alpha1_datastream_streams_list]
