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

// [START datamigration_v1_datamigrationservice_import_mapping_rules]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the importMappingRules method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} conversionWorkspaceId - The ID of the conversion workspace (caller-chosen during creation or retrieved from an existing workspace, for example, 'sample-workspace-id').
 */
async function importMappingRules(projectId, locationId, conversionWorkspaceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/conversionWorkspaces/${conversionWorkspaceId}`;
    const rulesFiles = [
      {
        rulesSourceFilename: 'ora2pg.conf',
        rulesContent: 'ORACLE_HOME /oracle\n',
      },
    ];
    const autoCommit = true;
    const rulesFormat = 'IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE';

    const request = {
      parent,
      rulesFiles,
      autoCommit,
      rulesFormat,
    };

    // Initialize the long-running operation and wait for completion
    const [operation] = await client.importMappingRules(request);
    const [response] = await operation.promise();

    console.log(`Mapping rules imported for conversion workspace: ${response.name}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`gRPC error (${err.code}): ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { importMappingRules };
// [END datamigration_v1_datamigrationservice_import_mapping_rules]
