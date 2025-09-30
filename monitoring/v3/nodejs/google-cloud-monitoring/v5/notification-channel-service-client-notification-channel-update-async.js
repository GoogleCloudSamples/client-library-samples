// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process');

// [START monitoring_v3_notificationchannelservice_notificationchannel_update_async]
const {NotificationChannelServiceClient} =
  require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Updates an existing notification channel in Google Cloud Monitoring.
 *
 * This function modifies the display name and description of a specified
 * notification channel. It demonstrates the use of a field mask to precisely
 * control which fields are updated, ensuring that only the intended properties
 * are changed without affecting others.
 *
 * @param {string} projectId The Google Cloud Project ID. Example: 'example-project-id'
 * @param {string} notificationChannelId The ID of the notification channel to update. Example: 'your-notification-channel-123'
 */
async function updateNotificationChannel(
  projectId,
  notificationChannelId = 'your-notification-channel-123',
) {
  const name = `projects/${projectId}/notificationChannels/${notificationChannelId}`;

  const notificationChannel = {
    name,
    displayName: 'Updated Example Notification Channel',
    description:
      'This channel has been updated via the Node.js client library.',
  };

  const updateMask = {
    paths: ['display_name', 'description'],
  };

  const request = {
    notificationChannel,
    updateMask,
  };

  try {
    const [updatedChannel] = await client.updateNotificationChannel(request);
    console.log(updatedChannel.name);
    console.log(`	Description: ${updatedChannel.description}`);
    console.log(`	Display Name: ${updatedChannel.displayName}`);
    console.log(`	Enabled: ${updatedChannel.enabled?.value}`);
    console.log(`	Type: ${updatedChannel.type}`);
    console.log(`	Verification Status: ${updatedChannel.verificationStatus}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Notification channel '${name}' not found. Make sure the project ID and channel ID are correct.`,
      );
      console.error(
        'Action: You might need to create the notification channel first using `createNotificationChannel`.',
      );
    } else {
      console.error('Failed to update notification channel:', err);
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateNotificationChannel(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID (for example, 'your-project-123')
 - Notification Channel ID (for example, 'your-channel-123')

Usage:

 node notification-channel-service-client-notification-channel-update-async.js your-project-123 your-channel-123`,
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  updateNotificationChannel,
};
