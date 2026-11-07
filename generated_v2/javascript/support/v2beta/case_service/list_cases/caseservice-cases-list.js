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

// [START cloudsupport_v2beta_caseservice_cases_list]
'use strict';

const {CaseServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseServiceClient();

/**
 * Use the listCases method
 *
 * @param {string} projectId - The Google Cloud project ID to list cases under.
 */
async function listCases(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [cases] = await client.listCases(request);
    console.log(`Retrieved ${cases.length} case(s).`);
    for (const supportCase of cases) {
      console.log(`Case: ${supportCase.name} - ${supportCase.displayName}`);
    }
  } catch (err) {
    if (
      err.code === status.NOT_FOUND ||
      err.code === status.PERMISSION_DENIED ||
      err.code === status.INVALID_ARGUMENT
    ) {
      console.error(`Support API error [code ${err.code}]: ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listCases };
// [END cloudsupport_v2beta_caseservice_cases_list]
