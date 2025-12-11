// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigquerymigration_v2_migrationservice_migrationworkflow_create]
// [START bigquerymigration_migrationservice_migrationworkflow_create]
const {MigrationServiceClient} = require('@google-cloud/bigquery-migration').v2;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Creates a migration workflow.
 *
 * Batch translate Teradata SQL scripts and DDL into BigQuery-compatible SQL.
 * It configures a translation task that reads input files from a
 * Google Cloud Storage source bucket and writes the converted output to a target bucket.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud location (for example, 'us').
 * @param {string} gcsSourcePath The Cloud Storage path for the source data (for example, 'gs://example-bucket/example-input-folder').
 * @param {string} gcsTargetPath The Cloud Storage path for the translated results (for example, 'gs://example-bucket/example-output-folder').
 */
async function createMigrationWorkflow(
  projectId,
  location,
  gcsSourcePath,
  gcsTargetPath,
) {
  const parent = client.locationPath(projectId, location);
  const migrationWorkflow = {
    displayName: 'Example BTEQ Migration Workflow',
    tasks: {
      'translation-task': {
        type: 'Translation_Teradata2BQ',
        translationConfigDetails: {
          gcsSourcePath,
          gcsTargetPath,
          sourceDialect: {
            teradataDialect: {
              mode: 'SQL',
            },
          },
          targetDialect: {
            bigqueryDialect: {},
          },
        },
      },
    },
  };

  const request = {
    parent,
    migrationWorkflow,
  };

  try {
    const [workflow] = await client.createMigrationWorkflow(request);
    console.log(`Created migration workflow: ${workflow.name}`);
    console.log(`  Display Name: ${workflow.displayName}`);
    console.log(`  State: ${workflow.state}`);
    console.log('  Tasks:');
    for (const taskName in workflow.tasks) {
      const task = workflow.tasks[taskName];
      console.log(`    - ${taskName}:`);
      console.log(`        Type: ${task.type}`);
      console.log(`        State: ${task.state}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error: Invalid argument provided for creating Migration '${migrationWorkflow.displayName}'. ` +
          `Details: ${err.message}. Please check the request parameters and ensure they are valid.`,
      );
    } else {
      console.error('Error creating migration workflow:', err);
    }
  }
}
// [END bigquerymigration_migrationservice_migrationworkflow_create]
// [END bigquerymigration_v2_migrationservice_migrationworkflow_create]

module.exports = {
  createMigrationWorkflow,
};
