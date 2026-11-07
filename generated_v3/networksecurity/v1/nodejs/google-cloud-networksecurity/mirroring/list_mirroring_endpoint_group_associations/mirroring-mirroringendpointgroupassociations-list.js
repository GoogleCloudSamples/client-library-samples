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

// [START networksecurity_v1_mirroring_mirroringendpointgroupassociations_list]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Lists mirroring endpoint group associations in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, for example 'global'.
 */
async function listMirroringEndpointGroupAssociations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [associations] = await client.listMirroringEndpointGroupAssociations(request);
    console.log(`Retrieved ${associations.length} mirroring endpoint group association(s).`);
    for (const association of associations) {
      console.log(`- Name: ${association.name}`);
      console.log(`  State: ${association.state}`);
      console.log(`  Network: ${association.network}`);
      console.log(`  Mirroring Endpoint Group: ${association.mirroringEndpointGroup}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listMirroringEndpointGroupAssociations };
// [END networksecurity_v1_mirroring_mirroringendpointgroupassociations_list]
