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

// [START cloudsupport_v2beta_caseservice_escalate_case]
'use strict';

const {CaseServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseServiceClient();

/**
 * Use the escalateCase method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} caseId - The server-generated ID of the support case to escalate.
 */
async function escalateCase(projectId, caseId) {
  try {
    const name = `projects/${projectId}/cases/${caseId}`;
    const escalation = {
      reason: 'BUSINESS_IMPACT',
      justification: 'Production service degradation affecting active customer transactions.',
    };

    const request = {
      name,
      escalation,
    };

    const [response] = await client.escalateCase(request);
    console.log(`Case escalated: ${response.name}`);
    console.log(`Priority: ${response.priority}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Case not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Case escalation failed precondition: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API Error [Code ${err.code}]: ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { escalateCase };
// [END cloudsupport_v2beta_caseservice_escalate_case]
