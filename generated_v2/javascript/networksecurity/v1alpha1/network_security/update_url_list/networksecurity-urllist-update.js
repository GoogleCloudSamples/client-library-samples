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

// [START networksecurity_v1alpha1_networksecurity_urllist_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Updates a UrlList resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region (for example, 'global').
 * @param {string} urlListId - The ID of the UrlList to update.
 */
async function updateUrlList(projectId, locationId, urlListId) {
  try {
    const urlList = {
      name: `projects/${projectId}/locations/${locationId}/urlLists/${urlListId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateUrlList({
      urlList,
      updateMask,
    });
    const [response] = await operation.promise();
    console.log(`Updated UrlList: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`URL list not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateUrlList };
// [END networksecurity_v1alpha1_networksecurity_urllist_update]
