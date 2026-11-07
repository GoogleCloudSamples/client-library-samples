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

// [START capacityplanner_v1beta_usageservice_export_forecasts]
'use strict';

const {UsageServiceClient} = require('@google-cloud/capacityplanner');
const {status} = require('@grpc/grpc-js');

const client = new UsageServiceClient();

/**
 * Exports capacity planning forecast data to Cloud Storage.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the capacity planner data is located (for example, 'us-central1')
 */
async function exportForecasts(projectId, locationId) {
  try {
    const outputConfig = {
      gcsDestination: {
        bucket: 'example-export-bucket',
        object: 'forecasts/export.json',
      },
    };
    const parent = `projects/${projectId}/locations/${locationId}`;
    const resourceType = 'gce-vcpus';

    const [operation] = await client.exportForecasts({
      parent,
      outputConfig,
      resourceType,
    });

    console.log('Waiting for forecast export operation to complete...');
    const [response] = await operation.promise();
    console.log('Forecast export completed successfully:', response);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { exportForecasts };
// [END capacityplanner_v1beta_usageservice_export_forecasts]
