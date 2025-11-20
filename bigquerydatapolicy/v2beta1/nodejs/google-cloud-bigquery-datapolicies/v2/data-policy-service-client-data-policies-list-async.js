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

const process = require('process');

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Lists all data policies in a given project and location.
 * This function demonstrates how to retrieve a paginated list of data policies
 * associated with a specific Google Cloud project and location.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The Google Cloud location (e.g., 'us', 'europe-west2').
 */
async function listDataPolicies(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent: parent,
  };

  try {
    for await (const dataPolicy of client.listDataPoliciesAsync(request)) {
      console.log(`Found data policy: ${dataPolicy.name}`);
      console.log(`  Data Policy ID: ${dataPolicy.dataPolicyId}`);
      console.log(`  Data Policy Type: ${dataPolicy.dataPolicyType}`);
      if (dataPolicy.policyTag) {
        console.log(`  Policy Tag: ${dataPolicy.policyTag}`);
      }
      if (dataPolicy.grantees && dataPolicy.grantees.length > 0) {
        console.log(`  Grantees: ${dataPolicy.grantees.join(', ')}`);
      }
    }
    console.log(
      `Successfully listed data policies for project ${projectId} in location ${location}.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' was not found.
        Ensure the project ID is correct and the location has BigQuery Data Policies enabled.`,
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing data policies for project '${projectId}' in location '${location}'.
        Ensure the service account or user has the necessary permissions (e.g., bigquery.datapolicies.list).`,
      );
    } else {
      console.error('Error listing data policies:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list_async]

module.exports = {
  listDataPolicies,
};

