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

// [START oracledatabase_v1_oracledatabase_test_goldengate_connection_assignment]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Tests a GoldenGate connection assignment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID where the GoldenGate connection assignment is located (for example, 'us-central1').
 * @param {string} goldengateConnectionAssignmentId - ID of the GoldenGate connection assignment (for example, 'example-assignment-id').
 */
async function testGoldengateConnectionAssignment(projectId, locationId, goldengateConnectionAssignmentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/goldengateConnectionAssignments/${goldengateConnectionAssignmentId}`;

    const request = {
      name,
    };

    const [response] = await client.testGoldengateConnectionAssignment(request);
    console.log(`GoldenGate connection assignment test result: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`GoldenGate connection assignment not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed for GoldenGate connection assignment: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { testGoldengateConnectionAssignment };
// [END oracledatabase_v1_oracledatabase_test_goldengate_connection_assignment]
