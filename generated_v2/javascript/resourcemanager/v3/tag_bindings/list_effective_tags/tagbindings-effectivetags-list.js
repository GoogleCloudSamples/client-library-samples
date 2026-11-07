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

// [START cloudresourcemanager_v3_tagbindings_effectivetags_list]
'use strict';

const {TagBindingsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagBindingsClient();

/**
 * Use the listEffectiveTags method
 *
 * @param {string} projectId - The Google Cloud project ID for which to list effective tags.
 */
async function listEffectiveTags(projectId) {
  const parent = `//cloudresourcemanager.googleapis.com/projects/${projectId}`;

  try {
    const request = {
      parent,
    };

    const [effectiveTags] = await client.listEffectiveTags(request);

    for (const tag of effectiveTags) {
      console.log(`Tag value: ${tag.namespacedTagValue}`);
      console.log(`Tag key: ${tag.namespacedTagKey}`);
      console.log(`Inherited: ${tag.inherited}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list effective tags: ${err.message}`);
    }
  }
}

module.exports = { listEffectiveTags };
// [END cloudresourcemanager_v3_tagbindings_effectivetags_list]
