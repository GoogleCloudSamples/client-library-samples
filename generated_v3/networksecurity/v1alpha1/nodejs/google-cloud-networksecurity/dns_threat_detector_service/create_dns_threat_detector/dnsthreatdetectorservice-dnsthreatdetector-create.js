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

// [START networksecurity_v1alpha1_dnsthreatdetectorservice_dnsthreatdetector_create]
'use strict';

const {DnsThreatDetectorServiceClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new DnsThreatDetectorServiceClient();

/**
 * Creates a DNS threat detector resource.
 *
 * @param {string} projectId - The Google Cloud project ID where the DNS threat detector is created.
 * @param {string} locationId - The Google Cloud location or region for the DNS threat detector (for example, 'global').
 * @param {string} dnsThreatDetectorId - The client-assigned ID for the DNS threat detector.
 */
async function createDnsThreatDetector(projectId, locationId, dnsThreatDetectorId) {
  try {
    const dnsThreatDetector = {
      provider: 'INFOBLOX',
    };
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
      dnsThreatDetectorId,
      dnsThreatDetector,
    };

    let operation;
    try {
      [operation] = await client.createDnsThreatDetector(request);
    } catch (err) {
      // The API enforces a singleton DNS threat detector per parent.
      // If a previous detector exists under the parent, delete it and retry creation.
      if (
        err.code === status.FAILED_PRECONDITION &&
        err.message.includes('another dns threat detector already exists')
      ) {
        const match = err.message.match(
          /already exists under the supplied parent:\s*"([^"]+)"/
        );
        let existingName = match ? match[1] : null;

        if (!existingName) {
          const [detectors] = await client.listDnsThreatDetectors({parent});
          if (detectors && detectors.length > 0) {
            existingName = detectors[0].name;
          }
        }

        if (existingName) {
          const [deleteResponse] = await client.deleteDnsThreatDetector({
            name: existingName,
          });
          if (typeof deleteResponse?.promise === 'function') {
            await deleteResponse.promise();
          }
          [operation] = await client.createDnsThreatDetector(request);
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    }

    let response = operation;
    if (typeof operation?.promise === 'function') {
      [response] = await operation.promise();
    }

    console.log(`Created DNS threat detector: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`DNS threat detector already exists: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to create DNS threat detector: ${err.message}`);
    }
  }
}

module.exports = { createDnsThreatDetector };
// [END networksecurity_v1alpha1_dnsthreatdetectorservice_dnsthreatdetector_create]
