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

// [START certificatemanager_v1_certificatemanager_certificate_create]
'use strict';

const crypto = require('crypto');
const {promisify} = require('util');
const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const generateKeyPair = promisify(crypto.generateKeyPair);

/**
 * Encodes a length value according to ASN.1 DER rules.
 *
 * @param {number} len - The length in bytes.
 * @returns {Buffer} The DER-encoded length.
 */
function derLength(len) {
  if (len < 128) {
    return Buffer.from([len]);
  }
  const bytes = [];
  let temp = len;
  while (temp > 0) {
    bytes.unshift(temp & 0xff);
    temp >>= 8;
  }
  return Buffer.from([0x80 | bytes.length, ...bytes]);
}

/**
 * Wraps content in an ASN.1 DER tag.
 *
 * @param {number} tag - The ASN.1 tag byte.
 * @param {...Buffer} contents - Buffers to concatenate into the tag body.
 * @returns {Buffer} The complete DER-encoded TLV element.
 */
function derTag(tag, ...contents) {
  const body = Buffer.concat(contents);
  return Buffer.concat([Buffer.from([tag]), derLength(body.length), body]);
}

/**
 * Wraps content in an ASN.1 DER SEQUENCE (0x30).
 *
 * @param {...Buffer} contents - Sequence elements.
 * @returns {Buffer} The DER-encoded sequence.
 */
function derSeq(...contents) {
  return derTag(0x30, ...contents);
}

/**
 * Formats a Date object to an ASN.1 UTCTime string (YYMMDDHHMMSSZ).
 *
 * @param {Date} date - The date to format.
 * @returns {string} The UTCTime formatted string.
 */
function formatUtcTime(date) {
  const pad = n => String(n).padStart(2, '0');
  const yy = pad(date.getUTCFullYear() % 100);
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${yy}${mm}${dd}${hh}${min}${ss}Z`;
}

/**
 * Generates a valid self-signed X.509 certificate and RSA private key.
 *
 * @returns {Promise<{pemCertificate: string, pemPrivateKey: string}>} The PEM-encoded certificate and key.
 */
async function generateSelfSignedCertificate() {
  const {publicKey, privateKey} = await generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {type: 'spki', format: 'der'},
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
  });

  const notBefore = new Date();
  const notAfter = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  const version = derTag(0xa0, derTag(0x02, Buffer.from([0x02])));
  const serialNumber = derTag(0x02, Buffer.from([0x01]));
  // sha256WithRSAEncryption OID 1.2.840.113549.1.1.11 and NULL parameter
  const sha256WithRsa = derSeq(
    derTag(
      0x06,
      Buffer.from([0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b])
    ),
    derTag(0x05)
  );
  // Common Name (CN=example.com)
  const name = derSeq(
    derTag(
      0x31,
      derSeq(
        derTag(0x06, Buffer.from([0x55, 0x04, 0x03])),
        derTag(0x13, Buffer.from('example.com'))
      )
    )
  );
  const validity = derSeq(
    derTag(0x17, Buffer.from(formatUtcTime(notBefore))),
    derTag(0x17, Buffer.from(formatUtcTime(notAfter)))
  );

  // SubjectAltName extension (OID 2.5.29.17) with dNSName example.com
  const sanExtension = derSeq(
    derTag(0x06, Buffer.from([0x55, 0x1d, 0x11])),
    derTag(0x04, derSeq(derTag(0x82, Buffer.from('example.com'))))
  );
  const extensions = derTag(0xa3, derSeq(sanExtension));

  const tbsCertificate = derSeq(
    version,
    serialNumber,
    sha256WithRsa,
    name,
    validity,
    name,
    publicKey,
    extensions
  );

  const signature = crypto.sign('sha256', tbsCertificate, privateKey);
  const signatureBitString = derTag(
    0x03,
    Buffer.concat([Buffer.from([0x00]), signature])
  );

  const certDer = derSeq(tbsCertificate, sha256WithRsa, signatureBitString);
  const pemCertificate = [
    '-----BEGIN CERTIFICATE-----',
    ...certDer.toString('base64').match(/.{1,64}/g),
    '-----END CERTIFICATE-----',
  ].join('\n');

  return {pemCertificate, pemPrivateKey: privateKey};
}

/**
 * Creates a self-managed certificate in Google Cloud Certificate Manager.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} certificateId - Caller-chosen ID of the certificate to create (for example, 'example-certificate'). Must match regex `[a-z0-9-]{1,63}`.
 */
async function createCertificate(projectId, locationId, certificateId) {
  const client = new CertificateManagerClient();
  const parent = `projects/${projectId}/locations/${locationId}`;
  const {pemCertificate, pemPrivateKey} =
    await generateSelfSignedCertificate();

  const certificate = {
    description: 'Example self-managed certificate',
    selfManaged: {
      pemCertificate,
      pemPrivateKey,
    },
  };

  try {
    const [operation] = await client.createCertificate({
      parent,
      certificateId,
      certificate,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Certificate created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate already exists: ${err.message}`);
    } else {
      console.error(`Error creating certificate: ${err.message}`);
    }
  }
}

module.exports = {createCertificate};
// [END certificatemanager_v1_certificatemanager_certificate_create]
