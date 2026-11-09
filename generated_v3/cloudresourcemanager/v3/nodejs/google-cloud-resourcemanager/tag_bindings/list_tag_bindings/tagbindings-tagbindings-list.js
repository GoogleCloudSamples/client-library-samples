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

// [START cloudresourcemanager_v3_tagbindings_tagbindings_list]
'use strict';

const {TagBindingsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagBindingsClient();

/**
 * Lists tag bindings directly attached to a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID to list TagBindings for. Preexisting project identifier.
 */
async function listTagBindings(projectId) {
  try {
    const parent = `//cloudresourcemanager.googleapis.com/projects/${projectId}`;
    const request = {
      parent,
    };

    const [tagBindings] = await client.listTagBindings(request);
    console.log(`Retrieved ${tagBindings.length} tag binding(s).`);
    for (const tagBinding of tagBindings) {
      console.log(`Tag binding: ${tagBinding.name}`);
      console.log(`Tag value: ${tagBinding.tagValue}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with error: ${err.message}`);
    }
  }
}

module.exports = { listTagBindings };
// [END cloudresourcemanager_v3_tagbindings_tagbindings_list]
