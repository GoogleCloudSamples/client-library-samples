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

// [START cloudsupport_v2_caseservice_cases_search]
'use strict';

const {CaseServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseServiceClient();

/**
 * Use the searchCases method
 *
 * @param {string} projectId - The Google Cloud project ID under which to search support cases. This is a caller-provided identifier of an existing project.
 * @param {string} query - An expression used to filter cases, such as 'state=OPEN' or 'priority=P1'. If empty or omitted, all cases under the parent resource will be returned.
 */
async function searchCases(projectId, query) {
  try {
    // Construct the parent resource path for the project
    const parent = `projects/${projectId}`;
    const request = {
      parent,
      query,
    };

    // Retrieve cases matching the search criteria
    const [cases] = await client.searchCases(request);

    console.log(`Retrieved ${cases.length} cases.`);
    for (const caseItem of cases) {
      console.log(`Case Name: ${caseItem.name}`);
      console.log(`  Display Name: ${caseItem.displayName}`);
      console.log(`  State: ${caseItem.state}`);
      console.log(`  Priority: ${caseItem.priority}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { searchCases };
// [END cloudsupport_v2_caseservice_cases_search]
