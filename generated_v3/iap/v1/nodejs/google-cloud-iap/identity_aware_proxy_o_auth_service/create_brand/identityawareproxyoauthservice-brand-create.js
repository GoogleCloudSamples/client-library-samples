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

// [START iap_v1_identityawareproxyoauthservice_brand_create]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Creates an Identity-Aware Proxy (IAP) OAuth brand for a Google Cloud project.
 */
async function createBrand() {
  try {
    const projectId = await client.getProjectId();

    // Use the authenticated identity email to satisfy support email validation.
    const credentials = await client.auth.getCredentials();
    let supportEmail = credentials && credentials.client_email;
    if (!supportEmail) {
      const authClient = await client.auth.getClient();
      if (authClient && authClient.email) {
        supportEmail = authClient.email;
      } else if (
        authClient &&
        typeof authClient.getServiceAccountEmail === 'function'
      ) {
        supportEmail = await authClient.getServiceAccountEmail();
      }
    }
    if (!supportEmail) {
      supportEmail = 'example-support@example.com';
    }

    const parent = `projects/${projectId}`;
    const brand = {
      supportEmail,
      applicationTitle: 'Example Application',
    };

    const [response] = await client.createBrand({
      parent,
      brand,
    });

    console.log(`Created brand: ${response.name}`);
    console.log(`Application title: ${response.applicationTitle}`);
    console.log(`Support email: ${response.supportEmail}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Brand already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to create brand: ${err.message}`);
    }
  }
}

module.exports = {createBrand};
// [END iap_v1_identityawareproxyoauthservice_brand_create]
