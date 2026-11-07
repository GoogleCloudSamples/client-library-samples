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

// [START containeranalysis_v1_containeranalysis_iampolicy_get]
'use strict';

const {ContainerAnalysisClient} = require('@google-cloud/containeranalysis');
const {status} = require('@grpc/grpc-js');

const client = new ContainerAnalysisClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} noteId - The ID of the Container Analysis note.
 */
async function getIamPolicy(projectId, noteId) {
  try {
    const resource = `projects/${projectId}/notes/${noteId}`;
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);
    console.log(`IAM policy retrieved for: ${resource}`);
    console.log(`Policy bindings count: ${policy.bindings ? policy.bindings.length : 0}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Note resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing note: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getIamPolicy };
// [END containeranalysis_v1_containeranalysis_iampolicy_get]
