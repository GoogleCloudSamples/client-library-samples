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

// [START migrationcenter_v1_migrationcenter_reportconfig_create]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the createReportConfig method
 *
 * @param {string} reportConfigId - User-specified ID for the ReportConfig. Must be unique within the project, start with a lowercase letter, contain lowercase letters, digits, and hyphens up to 63 characters, matching regex [a-z]([a-z0-9-]{0,61}[a-z0-9])?.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} groupId - The identifier of the Group to associate with the report configuration.
 * @param {string} preferenceSetId - The identifier of the PreferenceSet to associate with the report configuration.
 */
async function createReportConfig(reportConfigId, projectId, locationId, groupId, preferenceSetId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const reportConfig = {
      description: 'Assessment report configuration',
      groupPreferencesetAssignments: [
        {
          group: `projects/${projectId}/locations/${locationId}/groups/${groupId}`,
          preferenceSet: `projects/${projectId}/locations/${locationId}/preferenceSets/${preferenceSetId}`,
        },
      ],
    };

    const request = {
      parent,
      reportConfigId,
      reportConfig,
    };

    const [operation] = await client.createReportConfig(request);
    const [response] = await operation.promise();

    console.log(`Created report config: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Report config already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createReportConfig };
// [END migrationcenter_v1_migrationcenter_reportconfig_create]
