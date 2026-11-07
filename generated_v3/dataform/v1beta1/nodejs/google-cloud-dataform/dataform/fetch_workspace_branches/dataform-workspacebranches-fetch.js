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

// [START dataform_v1beta1_dataform_fetch_workspace_branches]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Fetches git branches for a Dataform workspace.
 *
 * @param {string} workspaceId - ID of the Workspace (for example, 'example-workspace-id')
 * @param {string} repositoryId - ID of the Repository (for example, 'example-repository-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function fetchWorkspaceBranches(
  workspaceId,
  repositoryId,
  locationId,
  projectId
) {
  if (typeof workspaceId === 'object' && workspaceId !== null) {
    const options = workspaceId;
    workspaceId = options.workspaceId || options.workspace_id;
    repositoryId = options.repositoryId || options.repository_id;
    locationId = options.locationId || options.location_id;
    projectId = options.projectId || options.project_id;
  }

  // Detect whether arguments are supplied in (projectId, locationId, repositoryId, workspaceId) order
  if (
    typeof repositoryId === 'string' &&
    /^[a-z]+-[a-z]+[0-9]/.test(repositoryId) &&
    !/^[a-z]+-[a-z]+[0-9]/.test(locationId)
  ) {
    const originalWorkspaceId = workspaceId;
    const originalRepositoryId = repositoryId;
    const originalLocationId = locationId;
    const originalProjectId = projectId;

    projectId = originalWorkspaceId;
    locationId = originalRepositoryId;
    repositoryId = originalLocationId;
    workspaceId = originalProjectId;
  }

  projectId =
    projectId ||
    process.env.PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT;
  if (!projectId) {
    projectId = await client.getProjectId();
  }
  locationId =
    locationId ||
    process.env.LOCATION_ID ||
    process.env.GOOGLE_CLOUD_REGION ||
    'us-central1';
  repositoryId = repositoryId || process.env.REPOSITORY_ID;
  workspaceId = workspaceId || process.env.WORKSPACE_ID;

  const name = client.workspacePath(
    projectId,
    locationId,
    repositoryId,
    workspaceId
  );

  try {
    const [response] = await client.fetchWorkspaceBranches({
      name,
    });

    console.log(`Fetched workspace branches for ${name}:`);
    for (const branch of response.branches || []) {
      console.log(`- ${branch}`);
    }
    return response.branches;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Branch management is not enabled for workspace ${name}.`);
      return [];
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error: ${err.message}`);
    }
  }
}

module.exports = {fetchWorkspaceBranches};
// [END dataform_v1beta1_dataform_fetch_workspace_branches]
