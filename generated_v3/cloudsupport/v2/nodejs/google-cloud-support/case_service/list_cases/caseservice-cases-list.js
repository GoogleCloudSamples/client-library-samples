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

// [START cloudsupport_v2_caseservice_cases_list]
'use strict';

const {CaseServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseServiceClient();

/**
 * Lists cases under a Google Cloud project or organization.
 */
async function listCases() {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || (await client.getProjectId());
    const parent = `projects/${projectId}`;

    const request = {
      parent,
    };

    const [cases] = await client.listCases(request);

    if (!cases || cases.length === 0) {
      console.log('No cases found.');
      return;
    }

    for (const supportCase of cases) {
      console.log(`Case ID: ${supportCase.name}, State: ${supportCase.state}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to list cases:', err.details || err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Parent resource not found:', err.details || err.message);
    } else if (err.code) {
      console.error(`API error (${err.code}):`, err.details || err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { listCases };
// [END cloudsupport_v2_caseservice_cases_list]
