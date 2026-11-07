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

// [START privateca_v1_certificateauthorityservice_fetch_ca_certs]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Fetches Certificate Authority certificates and certificate chains from a CA pool.
 *
 * @param {string} project_id - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} location_id - Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} ca_pool_id - ID of the CA pool (for example, 'example-ca-pool')
 */
async function fetchCaCerts(project_id, location_id, ca_pool_id) {
  if (typeof project_id === 'object' && project_id !== null) {
    location_id = project_id.location_id || project_id.locationId;
    ca_pool_id = project_id.ca_pool_id || project_id.caPoolId;
    project_id = project_id.project_id || project_id.projectId;
  }

  try {
    // Construct the resource name for the target CA pool
    const ca_pool = client.caPoolPath(project_id, location_id, ca_pool_id);
    const request = {
      ca_pool,
      caPool: ca_pool,
    };

    const [response] = await client.fetchCaCerts(request);

    console.log(`Retrieved CA certificates for pool: ${ca_pool}`);
    for (const certChain of response.caCerts || []) {
      console.log('Certificate chain:');
      for (const cert of certChain.certificates || []) {
        console.log(cert);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CA pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Service error: ${err.message}`);
    }
  }
}

module.exports = { fetchCaCerts };
// [END privateca_v1_certificateauthorityservice_fetch_ca_certs]
