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

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Lists OS policy assignment reports in a specified Google Cloud project and zone.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud zone where VM instances and OS policy assignments reside (for example, 'us-central1-a').
 * @param {string} instanceId - The Compute Engine VM instance name or ID, or '-' to list reports across all instances.
 * @param {string} osPolicyAssignmentId - The OS policy assignment ID, or '-' to list reports across all assignments.
 */
async function listOsPolicyAssignmentReports(projectId, locationId, instanceId, osPolicyAssignmentId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/instances/${instanceId}/osPolicyAssignments/${osPolicyAssignmentId}`;

    const request = {
      parent,
    };

    const [response] = await client.listOSPolicyAssignmentReports(request);
    const reports = Array.isArray(response)
      ? response
      : (response && response.osPolicyAssignmentReports) || [];

    if (reports.length === 0) {
      console.log('No OS policy assignment reports found.');
      return;
    }

    for (const report of reports) {
      console.log(`Report: ${report.name}`);
      console.log(`OS Policy Assignment: ${report.osPolicyAssignment}`);
      console.log(`Compliance State: ${report.complianceState}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listOsPolicyAssignmentReports };
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
