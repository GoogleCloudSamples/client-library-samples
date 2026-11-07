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

// [START backupdr_v1_backupdr_fetch_data_source_references_for_resource_type]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Fetches data source references for a specified resource type.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function fetchDataSourceReferencesForResourceType(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const resourceType = 'sqladmin.googleapis.com/Instance';

    const request = {
      parent,
      resourceType,
    };

    const [response] = await client.fetchDataSourceReferencesForResourceType(request);
    console.log('Fetched data source references:');
    console.log(response);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Failed precondition:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('API call failed with error:', err);
    }
  }
}

module.exports = { fetchDataSourceReferencesForResourceType };
// [END backupdr_v1_backupdr_fetch_data_source_references_for_resource_type]
