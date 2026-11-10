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

// [START cloudprofiler_v2_profilerservice_profile_create]
'use strict';

const {ProfilerServiceClient} = require('@google-cloud/cloudprofiler');
const {status} = require('@grpc/grpc-js');

const client = new ProfilerServiceClient();

/**
 * Use the createProfile method
 *
 * @param {string} projectId - The Google Cloud project ID where profiles are collected.
 */
async function createProfile(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const deployment = {
      projectId: projectId,
      target: 'example-service',
      labels: {
        zone: 'us-central1-a',
        language: 'nodejs',
      },
    };
    const profileType = ['CPU'];

    const request = {
      parent,
      deployment,
      profileType,
    };

    const [profile] = await client.createProfile(request);
    console.log(`Profile created: ${profile.name}`);
    console.log(`Profile type: ${profile.profileType}`);
    console.log(`Profile duration: ${profile.duration}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication required: ${err.message}`);
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
  }
}

module.exports = { createProfile };
// [END cloudprofiler_v2_profilerservice_profile_create]
