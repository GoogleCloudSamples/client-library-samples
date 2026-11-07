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

// [START vmmigration_v1_vmmigration_imageimport_get]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Retrieves details of a specific ImageImport resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the image import.
 * @param {string} imageImportId - The identifier of the ImageImport resource.
 */
async function getImageImport(projectId, locationId, imageImportId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/imageImports/${imageImportId}`;

    const request = {
      name,
    };

    const [imageImport] = await client.getImageImport(request);

    console.log(`Image import resource name: ${imageImport.name}`);
    console.log(`State: ${imageImport.state}`);
    console.log(`Creation time: ${imageImport.createTime?.seconds}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Image import resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing image import resource: ${err.message}`);
    } else {
      console.error(`Failed to retrieve image import: ${err.message}`);
    }
  }
}

module.exports = { getImageImport };
// [END vmmigration_v1_vmmigration_imageimport_get]
