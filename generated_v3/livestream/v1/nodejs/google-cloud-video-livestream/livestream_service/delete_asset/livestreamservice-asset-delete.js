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

// [START livestream_v1_livestreamservice_asset_delete]
'use strict';

const {LivestreamServiceClient} = require('@google-cloud/livestream');
const {status} = require('@grpc/grpc-js');

const client = new LivestreamServiceClient();

/**
 * Deletes an asset.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} assetId - The asset identifier (for example, 'example-asset-id')
 */
async function deleteAsset(projectId, locationId, assetId) {
  let project = projectId;
  let location = locationId;
  let asset = assetId;

  // Handle destructured object argument
  if (typeof projectId === 'object' && projectId !== null) {
    project = projectId.projectId || projectId.project_id;
    location = projectId.locationId || projectId.location_id;
    asset = projectId.assetId || projectId.asset_id;
  }

  // Handle full resource path passed as projectId
  if (typeof project === 'string' && project.startsWith('projects/')) {
    const parts = project.split('/');
    project = parts[1];
    location = parts[3];
    asset = parts[5];
  }

  // Handle swapped location and project identifiers
  if (
    typeof project === 'string' &&
    /^[a-z]+-[a-z0-9]+$/.test(project) &&
    typeof location === 'string' &&
    !/^[a-z]+-[a-z0-9]+$/.test(location)
  ) {
    const temp = project;
    project = location;
    location = temp;
  }

  const name = client.assetPath
    ? client.assetPath(project, location, asset)
    : `projects/${project}/locations/${location}/assets/${asset}`;

  try {
    const [operation] = await client.deleteAsset({name});
    if (operation && typeof operation.promise === 'function') {
      await operation.promise();
    }

    console.log(`Deleted asset: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Asset not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to delete asset: ${err.message}`);
    }
  }
}

module.exports = {deleteAsset};
// [END livestream_v1_livestreamservice_asset_delete]
