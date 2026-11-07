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

// [START artifactregistry_v1beta2_artifactregistry_package_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the getPackage method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository.
 * @param {string} repositoryId - The identifier of the repository containing the package.
 * @param {string} packageId - The identifier of the package to retrieve.
 */
async function getPackage(projectId, locationId, repositoryId, packageId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;

    const [packageData] = await client.getPackage({name});

    console.log(`Retrieved package: ${packageData.name}`);
    console.log(`Display name: ${packageData.displayName}`);
    console.log(`Create time: ${packageData.createTime?.seconds}`);
    console.log(`Update time: ${packageData.updateTime?.seconds}`);

    return packageData;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Package not found: projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when attempting to access the package.');
    } else {
      console.error(`Failed to retrieve package: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPackage };
// [END artifactregistry_v1beta2_artifactregistry_package_get]
