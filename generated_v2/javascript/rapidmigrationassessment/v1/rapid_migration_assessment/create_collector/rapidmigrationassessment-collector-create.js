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

// [START rapidmigrationassessment_v1_rapidmigrationassessment_collector_create]
'use strict';

const {RapidMigrationAssessmentClient} = require('@google-cloud/rapidmigrationassessment');
const {status} = require('@grpc/grpc-js');

const client = new RapidMigrationAssessmentClient();

/**
 * Use the createCollector method
 *
 * @param {string} collectorId - Caller-chosen identifier for the collector resource.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region/location ID (e.g., 'us-central1').
 */
async function createCollector(collectorId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const collector = {
      displayName: 'Example Collector',
      description: 'Collector for migration assessment',
    };

    const request = {
      parent,
      collectorId,
      collector,
    };

    const [operation] = await client.createCollector(request);
    const [response] = await operation.promise();

    console.log(`Collector created: ${response.name}`);
    console.log(`Collector state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Collector already exists: ${collectorId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when attempting to create collector.');
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error('Failed to create collector:', err);
    }
  }
}

module.exports = { createCollector };
// [END rapidmigrationassessment_v1_rapidmigrationassessment_collector_create]
