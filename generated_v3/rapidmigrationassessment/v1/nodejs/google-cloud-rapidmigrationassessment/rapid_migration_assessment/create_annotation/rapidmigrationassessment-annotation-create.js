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

// [START rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
'use strict';

const {RapidMigrationAssessmentClient} = require('@google-cloud/rapidmigrationassessment');
const {status} = require('@grpc/grpc-js');

const client = new RapidMigrationAssessmentClient();

/**
 * Use the createAnnotation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 */
async function createAnnotation(projectId, locationId) {
  try {
    const annotation = {
      type: 'TYPE_LEGACY_EXPORT_CONSENT',
    };
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
      annotation,
    };

    const [operation] = await client.createAnnotation(request);
    const [response] = await operation.promise();

    console.log(`Annotation created successfully: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Annotation already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code: ${err.code}): ${err.message}`);
    } else {
      console.error(`Failed to create annotation: ${err.message}`);
    }
  }
}

module.exports = { createAnnotation };
// [END rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
