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

// [START privateca_v1_certificateauthorityservice_capool_delete]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the deleteCaPool method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - ID of the CaPool (for example, 'example-capool-id')
 */
async function deleteCaPool(projectId, locationId, caPoolId) {
  try {
    const name = client.caPoolPath(projectId, locationId, caPoolId);

    const [operation] = await client.deleteCaPool({
      name,
    });

    await operation.promise();

    console.log(`Deleted CA pool: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CA pool not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`CA pool cannot be deleted: ${err.message}`);
    } else {
      console.error(`Failed to delete CA pool: ${err.message}`);
    }
  }
}

module.exports = { deleteCaPool };
// [END privateca_v1_certificateauthorityservice_capool_delete]
