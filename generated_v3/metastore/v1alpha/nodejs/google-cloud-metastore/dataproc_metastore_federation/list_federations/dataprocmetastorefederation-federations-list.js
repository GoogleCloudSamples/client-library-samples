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

// [START metastore_v1alpha_dataprocmetastorefederation_federations_list]
'use strict';

const {DataprocMetastoreFederationClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreFederationClient();

/**
 * Lists the Dataproc Metastore federations in a location.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listFederations(locationId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = `projects/${projectNumber}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [federations] = await client.listFederations(request);

    if (federations.length === 0) {
      console.log('No federations found.');
      return;
    }

    for (const federation of federations) {
      console.log(`Federation: ${federation.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message || err}`);
    }
  }
}

module.exports = { listFederations };
// [END metastore_v1alpha_dataprocmetastorefederation_federations_list]
