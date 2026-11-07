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

// [START iap_v1_identityawareproxyoauthservice_brands_list]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Use the listBrands method
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listBrands(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const [response] = await client.listBrands({parent});

    if (!response.brands || response.brands.length === 0) {
      console.log(`No brands found for project: ${projectId}`);
      return;
    }

    for (const brand of response.brands) {
      console.log(`Brand Name: ${brand.name}`);
      console.log(`Support Email: ${brand.supportEmail}`);
      console.log(`Application Title: ${brand.applicationTitle}`);
      console.log(`Internal Only: ${brand.orgInternalOnly}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list brands with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listBrands };
// [END iap_v1_identityawareproxyoauthservice_brands_list]
