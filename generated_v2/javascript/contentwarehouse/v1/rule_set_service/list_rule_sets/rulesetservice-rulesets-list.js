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

// [START contentwarehouse_v1_rulesetservice_rulesets_list]
'use strict';

const {RuleSetServiceClient} = require('@google-cloud/contentwarehouse');
const {status} = require('@grpc/grpc-js');

const client = new RuleSetServiceClient();

/**
 * Lists rule sets in Document AI Warehouse.
 *
 * @param {string} locationId - The Google Cloud location or region of the Document AI Warehouse instance (for example, 'us' or 'us-central1').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listRuleSets(locationId, projectId) {
  try {
    // Document AI Warehouse requires a numeric project number rather than a project ID string.
    let projectIdentifier = projectId;
    if (!/^\d+$/.test(projectId)) {
      try {
        const res = await client.auth.request({
          url: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`,
        });
        if (res && res.data && res.data.projectNumber) {
          projectIdentifier = res.data.projectNumber;
        }
      } catch {
        try {
          const res = await client.auth.request({
            url: 'http://metadata.google.internal/computeMetadata/v1/project/numeric-project-id',
            headers: {'Metadata-Flavor': 'Google'},
          });
          if (res && res.data) {
            projectIdentifier = String(res.data).trim();
          }
        } catch {
          projectIdentifier = projectId;
        }
      }
    }

    const parent = `projects/${projectIdentifier}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [ruleSets] = await client.listRuleSets(request);

    for (const ruleSet of ruleSets) {
      console.log(`Rule Set Name: ${ruleSet.name}`);
      console.log(`Description: ${ruleSet.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API call failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listRuleSets };
// [END contentwarehouse_v1_rulesetservice_rulesets_list]
