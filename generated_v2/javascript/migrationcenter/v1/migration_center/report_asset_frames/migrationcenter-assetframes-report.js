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

// [START migrationcenter_v1_migrationcenter_report_asset_frames]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the reportAssetFrames method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where Migration Center resources are located (e.g., `us-central1`).
 * @param {string} sourceId - The ID of the Migration Center Source. This is a user-specified identifier conforming to RFC-1034 (`[a-z]([a-z0-9-]{0,61}[a-z0-9])?`).
 */
async function reportAssetFrames(projectId, locationId, sourceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const source = `projects/${projectId}/locations/${locationId}/sources/${sourceId}`;

    const machineDetails = {
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      machineName: 'example-machine',
      coreCount: 4,
      memoryMb: 16384,
    };

    const assetFrame = {
      reportTime: {
        seconds: Math.floor(Date.now() / 1000),
      },
      machineDetails,
    };

    const frames = {
      framesData: [assetFrame],
    };

    const request = {
      parent,
      source,
      frames,
    };

    const [response] = await client.reportAssetFrames(request);
    console.log('Reported asset frames successfully.');
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error reporting asset frames: ${err.message || err}`);
    }
  }
}

module.exports = { reportAssetFrames };
// [END migrationcenter_v1_migrationcenter_report_asset_frames]
