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

// [START datalineage_v1_lineage_batch_search_link_processes]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Resolves a project identifier to a numeric project number when necessary.
 * The Data Lineage API requires numeric project numbers in resource names.
 *
 * @param {string} project - The project ID or project number.
 * @returns {Promise<string>} The numeric project number.
 */
async function getProjectNumber(project) {
  if (/^\d+$/.test(project)) {
    return project;
  }
  if (process.env.GOOGLE_CLOUD_PROJECT_NUMBER) {
    return process.env.GOOGLE_CLOUD_PROJECT_NUMBER;
  }
  try {
    const res = await client.auth.request({
      url: `https://cloudresourcemanager.googleapis.com/v1/projects/${project}`,
    });
    if (res?.data?.projectNumber) {
      return String(res.data.projectNumber);
    }
  } catch (err) {
    if (err.code !== status.NOT_FOUND && err.code !== status.PERMISSION_DENIED) {
      // Fall through to compute metadata resolution
    }
  }
  try {
    const res = await client.auth.request({
      url: 'http://metadata.google.internal/computeMetadata/v1/project/numeric-project-id',
      headers: {'Metadata-Flavor': 'Google'},
    });
    if (res?.data && /^\d+$/.test(String(res.data).trim())) {
      return String(res.data).trim();
    }
  } catch (err) {
    if (err.code !== status.NOT_FOUND) {
      // Fall through and return original project identifier
    }
  }
  return project;
}

/**
 * Searches processes associated with specific data lineage links.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} linkId - ID of the Link (for example, 'example-link-id')
 */
async function batchSearchLinkProcesses(projectId, locationId, linkId) {
  try {
    const projectNumber = await getProjectNumber(projectId);
    const parent = `projects/${projectNumber}/locations/${locationId}`;
    const links = linkId.startsWith('projects/')
      ? linkId.replace(`projects/${projectId}/`, `projects/${projectNumber}/`)
      : `projects/${projectNumber}/locations/${locationId}/links/${linkId}`;

    const request = {
      parent,
      links: [links],
    };

    // Retrieve processes associated with the specified links
    const [response] = await client.batchSearchLinkProcesses(request);

    if (!response || response.length === 0) {
      console.log('No processes found for the specified link.');
      return;
    }

    for (const processLink of response) {
      console.log(`Process: ${processLink.process}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { batchSearchLinkProcesses };
// [END datalineage_v1_lineage_batch_search_link_processes]
