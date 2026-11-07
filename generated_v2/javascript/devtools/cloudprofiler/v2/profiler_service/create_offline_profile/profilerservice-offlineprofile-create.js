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

// [START cloudprofiler_v2_profilerservice_offlineprofile_create]
'use strict';

const util = require('util');
const zlib = require('zlib');
const {ProfilerServiceClient} = require('@google-cloud/cloudprofiler');
const {status} = require('@grpc/grpc-js');

const gzip = util.promisify(zlib.gzip);
const client = new ProfilerServiceClient();

/**
 * Creates an offline profile for a project.
 *
 * @param {string} projectId - The Google Cloud project ID to create the offline profile in.
 */
async function createOfflineProfile(projectId) {
  try {
    const parent = `projects/${projectId}`;

    // Cloud Profiler expects valid gzip-compressed pprof proto data.
    const pprofData = Buffer.from([
      // sample_type: ValueType { type: 1 ("samples"), unit: 2 ("count") }
      0x0a, 0x04, 0x08, 0x01, 0x10, 0x02,
      // sample_type: ValueType { type: 3 ("cpu"), unit: 4 ("nanoseconds") }
      0x0a, 0x04, 0x08, 0x03, 0x10, 0x04,
      // period_type: ValueType { type: 3 ("cpu"), unit: 4 ("nanoseconds") }
      0x5a, 0x04, 0x08, 0x03, 0x10, 0x04,
      // period: 10000000 (10ms)
      0x60, 0x80, 0xad, 0xe2, 0x04,
      // duration_nanos: 10000000000 (10s)
      0x50, 0x80, 0xc8, 0xaf, 0xa0, 0x25,
      // string_table: "" (index 0)
      0x32, 0x00,
      // string_table: "samples" (index 1)
      0x32, 0x07, 0x73, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x73,
      // string_table: "count" (index 2)
      0x32, 0x05, 0x63, 0x6f, 0x75, 0x6e, 0x74,
      // string_table: "cpu" (index 3)
      0x32, 0x03, 0x63, 0x70, 0x75,
      // string_table: "nanoseconds" (index 4)
      0x32, 0x0b, 0x6e, 0x61, 0x6e, 0x6f, 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x73,
    ]);

    const profileBytes = await gzip(pprofData);

    const profile = {
      profileType: 'CPU',
      duration: {
        seconds: 10,
        nanos: 0,
      },
      deployment: {
        projectId,
        target: 'example-service',
      },
      profileBytes,
    };

    const [response] = await client.createOfflineProfile({
      parent,
      profile,
    });

    console.log(`Created offline profile: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createOfflineProfile };
// [END cloudprofiler_v2_profilerservice_offlineprofile_create]
