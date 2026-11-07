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

// [START networksecurity_v1_networksecurity_urllist_delete]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

// UrlList operations are supported in v1beta1 or v1 depending on SDK release.
const NetworkSecurityClient =
  networkSecurity.v1?.NetworkSecurityClient?.prototype?.deleteUrlList
    ? networkSecurity.v1.NetworkSecurityClient
    : (networkSecurity.v1beta1?.NetworkSecurityClient ||
       networkSecurity.NetworkSecurityClient);

const client = new NetworkSecurityClient();

/**
 * Deletes a UrlList resource in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} urlListId - The UrlList identifier (for example, 'example-urllist-id')
 */
async function deleteUrlList(projectId, locationId, urlListId) {
  const name = `projects/${projectId}/locations/${locationId}/urlLists/${urlListId}`;

  try {
    const request = {
      name,
    };

    const [operation] = await client.deleteUrlList(request);
    await operation.promise();

    console.log(`Deleted UrlList: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`UrlList resource not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting UrlList: ${name}`);
    } else {
      console.error(`Failed to delete UrlList: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteUrlList };
// [END networksecurity_v1_networksecurity_urllist_delete]
