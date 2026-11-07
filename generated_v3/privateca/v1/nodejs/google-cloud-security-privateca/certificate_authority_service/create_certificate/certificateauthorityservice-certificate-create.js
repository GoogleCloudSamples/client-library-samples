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

// [START privateca_v1_certificateauthorityservice_certificate_create]
'use strict';

const {generateKeyPairSync} = require('crypto');
const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the createCertificate method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - ID of the CaPool (for example, 'example-capool-id')
 * @param {string} certificateId - The caller-provided ID of the Certificate to create (for example, 'example-certificate'). Must be unique within a location and match regex [a-zA-Z0-9_-]{1,63}. Required if the issuing CA pool is in the Enterprise tier; optional otherwise.
 */
async function createCertificate(projectId, locationId, caPoolId, certificateId) {
  try {
    const parent = client.caPoolPath(projectId, locationId, caPoolId);

    // Configure certificate subject details
    const subjectConfig = {
      subject: {
        commonName: 'example.com',
      },
    };

    // Configure certificate extensions and key usage
    const x509Config = {
      keyUsage: {
        baseKeyUsage: {
          digitalSignature: true,
          keyEncipherment: true,
        },
      },
    };

    // Generate a valid RSA public key for certificate issuance
    const {publicKey: pemPublicKey} = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
    });

    const publicKey = {
      format: 'PEM',
      key: Buffer.from(pemPublicKey),
    };

    const certificate = {
      lifetime: {
        seconds: 86400,
      },
      config: {
        subjectConfig,
        x509Config,
        publicKey,
      },
    };

    const request = {
      parent,
      certificateId,
      certificate,
    };

    const [response] = await client.createCertificate(request);

    console.log(`Certificate created successfully: ${response.name}`);
    console.log(`PEM certificate chain:\n${response.pemCertificate}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createCertificate};
// [END privateca_v1_certificateauthorityservice_certificate_create]
