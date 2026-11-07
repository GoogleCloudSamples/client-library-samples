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

// [START appengine_v1_versions_versions_list]
'use strict';

const {VersionsClient} = require('@google-cloud/appengine-admin');
const {status} = require('@grpc/grpc-js');

/**
 * Lists versions for the default App Engine service.
 */
async function listVersions() {
  const client = new VersionsClient();

  try {
    const projectId = await client.getProjectId();
    const serviceId = 'default';
    const parent = `apps/${projectId}/services/${serviceId}`;

    const request = {
      parent,
    };

    const [versions] = await client.listVersions(request);

    if (versions.length === 0) {
      console.log('No versions found.');
      return;
    }

    for (const version of versions) {
      console.log(`Version ID: ${version.id}`);
      console.log(`Version Name: ${version.name}`);
      console.log(`Serving Status: ${version.servingStatus}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log('App Engine service or application not found.');
      return;
    }
    if (err.code === status.FAILED_PRECONDITION) {
      console.log('App Engine application has not been created.');
      return;
    }
    if (err.code === status.PERMISSION_DENIED) {
      console.log('App Engine Admin API is not enabled or access is restricted.');
      return;
    }
    console.error(`Error listing versions: ${err.message}`);
    throw err;
  }
}

module.exports = { listVersions };
// [END appengine_v1_versions_versions_list]
