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

'use strict';

const { rawEncrypt } = require('./keymanagementservice-rawencrypt.js');

function stripQuotes(val) {
  if (typeof val === 'string' && val.length >= 2) {
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      return val.slice(1, -1);
    }
  }
  return val;
}

// Support environment variables with optional CLI argument overrides
const projectId = stripQuotes(process.env.PROJECT_ID || process.argv[2]);
const locationId = stripQuotes(process.env.LOCATION_ID || process.argv[3]);
const keyRingId = stripQuotes(process.env.KEY_RING_ID || process.argv[4]);
const cryptoKeyId = stripQuotes(process.env.CRYPTO_KEY_ID || process.argv[5]);
const cryptoKeyVersionId = stripQuotes(process.env.CRYPTO_KEY_VERSION_ID || process.argv[6]);
const plaintext = stripQuotes(process.env.PLAINTEXT || process.argv[7]);

rawEncrypt(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId, plaintext);
