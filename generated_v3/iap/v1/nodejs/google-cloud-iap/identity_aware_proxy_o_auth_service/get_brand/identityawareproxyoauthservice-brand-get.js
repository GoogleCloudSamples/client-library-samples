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

// [START iap_v1_identityawareproxyoauthservice_brand_get]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Retrieves the specified Cloud Identity-Aware Proxy brand.
 *
 * @param {string} brandId - The brand identifier (for example, 'example-brand-id').
 */
async function getBrand(brandId) {
  try {
    const projectId = await client.getProjectId();
    const name = brandId.startsWith('projects/')
      ? brandId
      : `projects/${projectId}/brands/${brandId}`;

    const [brand] = await client.getBrand({name});

    console.log(`Brand name: ${brand.name}`);
    console.log(`Support email: ${brand.supportEmail}`);
    console.log(`Application title: ${brand.applicationTitle}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Brand not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getBrand };
// [END iap_v1_identityawareproxyoauthservice_brand_get]
