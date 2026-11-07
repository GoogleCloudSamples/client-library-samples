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

// [START privateca_v1_certificateauthorityservice_certificateauthority_create]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the createCertificateAuthority method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - ID of the CaPool (for example, 'example-capool-id')
 * @param {string} certificateAuthorityId - ID of the CertificateAuthority (for example, 'example-certificateauthority-id')
 */
async function createCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const parent = client.caPoolPath(projectId, locationId, caPoolId);

    const subjectConfig = {
      subject: {
        organization: 'Example Organization',
        commonName: 'Example Root CA',
      },
    };

    const x509Config = {
      caOptions: {
        isCa: true,
      },
      keyUsage: {
        baseKeyUsage: {
          certSign: true,
          crlSign: true,
        },
      },
    };

    const certificateAuthority = {
      type: 'SELF_SIGNED',
      keySpec: {
        algorithm: 'RSA_PKCS1_4096_SHA256',
      },
      config: {
        subjectConfig,
        x509Config,
      },
      lifetime: {
        seconds: 315360000,
      },
    };

    const request = {
      parent,
      certificateAuthorityId,
      certificateAuthority,
    };

    const [operation] = await client.createCertificateAuthority(request);
    const [response] = await operation.promise();

    console.log(`Certificate Authority created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate Authority already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_certificateauthority_create]
