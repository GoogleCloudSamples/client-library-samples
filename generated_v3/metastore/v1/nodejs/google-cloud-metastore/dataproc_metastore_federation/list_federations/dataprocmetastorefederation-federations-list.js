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

// [START metastore_v1_dataprocmetastorefederation_federations_list]
'use strict';

const {DataprocMetastoreFederationClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreFederationClient();

/**
 * Lists the Dataproc Metastore federations in a given location.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listFederations(locationId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = client.locationPath(projectNumber, locationId);

    const request = {
      parent,
    };

    const [federations] = await client.listFederations(request);

    console.log(`Found ${federations.length} federation(s):`);
    for (const federation of federations) {
      console.log(`- Name: ${federation.name}`);
      console.log(`  State: ${federation.state}`);
      console.log(`  Hive Metastore version: ${federation.version}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listFederations };
// [END metastore_v1_dataprocmetastorefederation_federations_list]
