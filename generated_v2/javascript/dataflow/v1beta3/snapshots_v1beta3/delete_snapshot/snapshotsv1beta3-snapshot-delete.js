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

// [START dataflow_v1beta3_snapshotsv1beta3_snapshot_delete]
'use strict';

const {SnapshotsV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new SnapshotsV1Beta3Client();

/**
 * Deletes a Cloud Dataflow snapshot.
 */
async function deleteSnapshot() {
  const projectId = await client.getProjectId();
  const snapshotId = process.env.SNAPSHOT_ID;

  const request = {
    projectId,
    location: 'us-central1',
    snapshotId,
  };

  try {
    const [response] = await client.deleteSnapshot(request);
    console.log('Snapshot deleted successfully:', response);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Snapshot not found:', err.message);
    } else {
      console.error('Failed to delete snapshot:', err.message);
    }
  }
}

module.exports = { deleteSnapshot };
// [END dataflow_v1beta3_snapshotsv1beta3_snapshot_delete]
