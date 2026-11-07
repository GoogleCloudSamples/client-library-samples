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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_migrate_key]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Migrates a legacy reCAPTCHA key to reCAPTCHA Enterprise.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} keyId - The 40-character legacy reCAPTCHA site key to migrate.
 * @param {boolean} [skipBillingCheck=false] - Whether to skip the billing check during migration.
 */
async function migrateKey(projectId, keyId, skipBillingCheck = false) {
  try {
    const name = `projects/${projectId}/keys/${keyId}`;

    const request = {
      name,
      skipBillingCheck,
    };

    const [key] = await client.migrateKey(request);
    console.log(`Migrated key: ${key.name}`);
    return key;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid key resource name: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Key not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while migrating key: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during key migration: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Key already migrated: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {migrateKey};
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_migrate_key]
