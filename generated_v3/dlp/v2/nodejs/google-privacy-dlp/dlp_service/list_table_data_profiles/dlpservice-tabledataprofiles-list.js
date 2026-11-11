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

// [START dlp_v2_dlpservice_tabledataprofiles_list]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists Sensitive Data Protection table data profiles in an organization.
 *
 * @param {string} organization_id - The Google Cloud organization ID.
 * @param {string} location_id - The geographic location where the table data profiles are stored.
 */
async function listTableDataProfiles(organization_id, location_id) {
  const parent = `organizations/${organization_id}/locations/${location_id}`;
  const request = {
    parent,
  };

  if (!organization_id) {
    console.error('Organization ID is required.');
    return;
  }

  try {
    const [profiles] = await client.listTableDataProfiles(request);
    console.log(`Retrieved ${profiles.length} table data profile(s).`);
    for (const profile of profiles) {
      console.log(`Table data profile: ${profile.name}`);
      console.log(`  Full resource: ${profile.fullResource}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Parent resource not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing table data profiles.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided.');
    } else {
      console.error(`Error listing table data profiles: ${err.code || err}`);
    }
  }
}

module.exports = {listTableDataProfiles};
// [END dlp_v2_dlpservice_tabledataprofiles_list]
