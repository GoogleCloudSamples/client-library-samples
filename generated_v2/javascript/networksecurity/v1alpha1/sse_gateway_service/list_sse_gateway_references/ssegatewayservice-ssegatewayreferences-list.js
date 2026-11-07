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

// [START networksecurity_v1alpha1_ssegatewayservice_ssegatewayreferences_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const SSEGatewayServiceClient =
  v1alpha1.SSEGatewayServiceClient || v1alpha1.SseGatewayServiceClient;
const client = new SSEGatewayServiceClient();

/**
 * Lists SSE gateway references in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, 'global' or 'us-central1').
 */
async function listSseGatewayReferences(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const listReferences =
      client.listSSEGatewayReferences || client.listSseGatewayReferences;
    const [response] = await listReferences.call(client, request);

    // Normalize response across paginated arrays and response message objects
    const references = Array.isArray(response)
      ? response
      : (response?.sseGatewayReferences || response?.sse_gateway_references || []);

    console.log(`Found ${references.length} SSE gateway reference(s).`);
    for (const reference of references) {
      console.log(`Reference: ${reference.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listSseGatewayReferences };
// [END networksecurity_v1alpha1_ssegatewayservice_ssegatewayreferences_list]
