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

// [START metastore_v1beta_dataprocmetastore_services_list]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Use the listServices method
 *
 * @param {string} locationId - The Google Cloud region where the metastore service is located (for example, 'us-central1').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listServices(locationId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [services] = await client.listServices({parent});

    for (const service of services) {
      console.log(`Service: ${service.name}`);
      console.log(`State: ${service.state}`);
      console.log(`Tier: ${service.tier}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else {
      console.error('API error:', err.message);
    }
    throw err;
  }
}

module.exports = { listServices };
// [END metastore_v1beta_dataprocmetastore_services_list]
