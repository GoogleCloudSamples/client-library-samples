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

// [START saasservicemgmt_v1beta1_saasdeployments_tenant_create]
'use strict';

const {SaasDeploymentsClient} = require('@google-cloud/saasservicemgmt');
const {status} = require('@grpc/grpc-js');

const client = new SaasDeploymentsClient();

/**
 * Creates a tenant in a SaaS deployment.
 *
 * @param {string} tenantId - ID of the Tenant (for example, 'example-tenant-id')
 */
async function createTenant(tenantId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;
    const tenant = {
      displayName: 'Example Tenant',
    };

    const request = {
      parent,
      tenantId,
      tenant,
    };

    const [response] = await client.createTenant(request);

    console.log(`Created tenant: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tenant already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createTenant };
// [END saasservicemgmt_v1beta1_saasdeployments_tenant_create]
