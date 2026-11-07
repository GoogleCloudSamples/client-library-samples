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

// [START containeranalysis_v1beta1_containeranalysisv1beta1_iampolicy_get]
'use strict';

const {v1beta1} = require('@google-cloud/containeranalysis');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ContainerAnalysisV1Beta1Client();

/**
 * Retrieves the IAM access control policy for a Note.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} noteId - The ID of the Note to get the IAM policy for.
 */
async function getIamPolicy(projectId, noteId) {
  try {
    const resource = `projects/${projectId}/notes/${noteId}`;
    const [policy] = await client.getIamPolicy({resource});

    console.log(`Retrieved IAM policy for resource: ${resource}`);
    if (policy.bindings && policy.bindings.length > 0) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        console.log(`Members: ${binding.members ? binding.members.join(', ') : 'none'}`);
      }
    } else {
      console.log('No bindings found in policy.');
    }
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END containeranalysis_v1beta1_containeranalysisv1beta1_iampolicy_get]
