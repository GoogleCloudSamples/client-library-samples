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

// [START containeranalysis_v1_containeranalysis_test_iam_permissions]
'use strict';

const {ContainerAnalysisClient} = require('@google-cloud/containeranalysis');
const {status} = require('@grpc/grpc-js');

const client = new ContainerAnalysisClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} noteId - The caller-specified identifier of the Container Analysis note.
 */
async function testIamPermissions(projectId, noteId) {
  try {
    const resource = `projects/${projectId}/notes/${noteId}`;
    const permissions = ['containeranalysis.notes.setIamPolicy'];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Allowed permissions: ${JSON.stringify(response.permissions)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END containeranalysis_v1_containeranalysis_test_iam_permissions]
