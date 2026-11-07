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

// [START monitoring_v3_notificationchannelservice_notificationchannels_list]
'use strict';

const {NotificationChannelServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Use the listNotificationChannels method
 *
 * @param {string} projectId - The Google Cloud project ID from which to list notification channels.
 */
async function listNotificationChannels(projectId) {
  try {
    const name = `projects/${projectId}`;
    const request = {
      name,
    };

    const [channels] = await client.listNotificationChannels(request);

    for (const channel of channels) {
      console.log(`Channel Name: ${channel.name}`);
      console.log(`Display Name: ${channel.displayName}`);
      console.log(`Type: ${channel.type}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied for project ${projectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for project ${projectId}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request arguments: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listNotificationChannels };
// [END monitoring_v3_notificationchannelservice_notificationchannels_list]
