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

// [START cloudprofiler_v2_exportservice_profiles_list]
'use strict';

const {ExportServiceClient} = require('@google-cloud/cloudprofiler');
const {status} = require('@grpc/grpc-js');

const client = new ExportServiceClient();

/**
 * Lists Cloud Profiler profiles for a Google Cloud project.
 *
 * @param {string} userProjectId - ID of the UserProject (for example, 'example-project-id')
 */
async function listProfiles(userProjectId) {
  try {
    const parent = `projects/${userProjectId}`;

    const request = {
      parent,
    };

    const [profiles] = await client.listProfiles(request);
    if (!profiles || profiles.length === 0) {
      console.log('No profiles found.');
      return;
    }
    for (const profile of profiles) {
      console.log(`Profile: ${profile.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listProfiles };
// [END cloudprofiler_v2_exportservice_profiles_list]
