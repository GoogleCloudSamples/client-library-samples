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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Lists all data policies in a specified project.
 *
 * Data policies define rules for data masking, row-level security, or column-level security.
 *
 * @param {string} projectId The Google Cloud project ID. (For example, 'example-project-123')
 * @param {string} location The Google Cloud location of the data policies. (For example, 'us')
 */
async function listDataPolicies(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
  };

  try {
    console.log(
      `Listing data policies for project: ${projectId} in location: ${location}`,
    );
    const [dataPolicies] = await client.listDataPolicies(request);

    if (dataPolicies.length === 0) {
      console.log(
        `No data policies found in location ${location} for project ${projectId}.`,
      );
      return;
    }

    console.log('Data Policies:');
    for (const dataPolicy of dataPolicies) {
      console.log(`  Data Policy Name: ${dataPolicy.name}`);
      console.log(`    ID: ${dataPolicy.dataPolicyId}`);
      console.log(`    Type: ${dataPolicy.dataPolicyType}`);
      if (dataPolicy.policyTag) {
        console.log(`    Policy Tag: ${dataPolicy.policyTag}`);
      }
      if (dataPolicy.grantees && dataPolicy.grantees.length > 0) {
        console.log(`    Grantees: ${dataPolicy.grantees.join(', ')}`);
      }
      if (dataPolicy.dataMaskingPolicy) {
        if (dataPolicy.dataMaskingPolicy.predefinedExpression) {
          console.log(
            `    Data Masking Predefined Expression: ${dataPolicy.dataMaskingPolicy.predefinedExpression}`,
          );
        } else if (dataPolicy.dataMaskingPolicy.routine) {
          console.log(
            `    Data Masking Routine: ${dataPolicy.dataMaskingPolicy.routine}`,
          );
        }
      }
    }

    console.log(`Successfully listed ${dataPolicies.length} data policies.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project or location '${location}' for project '${projectId}' was not found. ` +
          'Make sure the project ID and location are correct and that the BigQuery Data Policy API is enabled.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing data policies for project '${projectId}' in location '${location}'. ` +
          'Make sure the authenticated account has the necessary permissions (For example, bigquery.datapolicies.list).',
      );
    } else {
      console.error(`Error listing data policies: ${err.message}`);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]

module.exports = {
  listDataPolicies,
};
