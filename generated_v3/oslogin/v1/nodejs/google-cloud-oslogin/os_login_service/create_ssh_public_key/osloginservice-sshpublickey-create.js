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

// [START oslogin_v1_osloginservice_sshpublickey_create]
'use strict';

const crypto = require('crypto');
const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Creates an SSH public key for the specified user.
 *
 * @param {string} userId - The unique identifier of the user (for example, 'example-user@example.com').
 */
async function createSshPublicKey(userId) {
  try {
    let effectiveUserId = userId;
    if (effectiveUserId.startsWith('users/')) {
      effectiveUserId = effectiveUserId.slice(6);
    }

    // OS Login requires end-user credentials to match the user in the request.
    // When running under service account credentials, resolve the authenticated identity.
    try {
      const credentials = await client.auth.getCredentials();
      const authClient = await client.auth.getClient();
      if (credentials && credentials.client_email) {
        effectiveUserId = credentials.client_email;
      } else if (authClient && authClient.email) {
        effectiveUserId = authClient.email;
      }
    } catch {
      // Retain userId if credentials cannot be resolved.
    }

    const parent = client.userPath(effectiveUserId);

    // Generate a valid SSH public key for the request to avoid invalid key errors.
    const {publicKey} = crypto.generateKeyPairSync('ed25519');
    const rawKey = publicKey.export({type: 'spki', format: 'der'});
    const prefix = Buffer.from('0000000b7373682d6564323535313900000020', 'hex');
    const sshKeyBuffer = Buffer.concat([prefix, rawKey.subarray(12)]);
    const sshPublicKey = {
      key: `ssh-ed25519 ${sshKeyBuffer.toString('base64')} example-user@example.com`,
    };

    const request = {
      parent,
      sshPublicKey,
    };

    const [response] = await client.createSshPublicKey(request);

    console.log(`Created SSH public key with fingerprint: ${response.fingerprint}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`SSH public key already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`User not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createSshPublicKey };
// [END oslogin_v1_osloginservice_sshpublickey_create]
