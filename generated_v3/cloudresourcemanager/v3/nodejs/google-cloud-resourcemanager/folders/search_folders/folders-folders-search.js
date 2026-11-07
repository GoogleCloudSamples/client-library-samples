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

// [START cloudresourcemanager_v3_folders_folders_search]
'use strict';

const {FoldersClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new FoldersClient();

/**
 * Searches folders matching the specified query.
 *
 * @param {string} query - Search criteria used to select the folders to return, such as 'state=ACTIVE'.
 */
async function searchFolders(query) {
  try {
    const request = {
      query,
    };

    const [folders] = await client.searchFolders(request);
    const results = folders || [];
    console.log(`Found ${results.length} folder(s) matching query: ${query}`);
    for (const folder of results) {
      console.log(`Folder: ${folder.name} (${folder.displayName})`);
      console.log(`State: ${folder.state}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid search query parameter: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing folders: ${err.message}`);
    } else {
      console.error(`Google Cloud Resource Manager API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { searchFolders };
// [END cloudresourcemanager_v3_folders_folders_search]
