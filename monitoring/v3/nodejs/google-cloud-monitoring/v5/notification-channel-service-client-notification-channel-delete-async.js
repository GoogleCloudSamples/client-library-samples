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

// [START monitoring_v3_notificationchannelservice_notificationchannel_delete_async]
const {NotificationChannelServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Deletes a notification channel.
 *
 * A notification channel is a medium through which an alert is delivered,
 * such as email, SMS, or a third-party messaging application. Deleting a
 * channel removes it from your project.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'YOUR_PROJECT_ID').
 * @param {string} notificationChannelId The ID of the notification channel to delete (for example, 'YOUR_NOTIFICATION_CHANNEL_ID').
 */
async function deleteNotificationChannel(
  projectId,
  notificationChannelId = 'YOUR_NOTIFICATION_CHANNEL_ID',
) {
  const name = `projects/${projectId}/notificationChannels/${notificationChannelId}`;

  const request = {
    name,
    // If true, the notification channel will be deleted regardless of its use in alert policies.
    force: true,
  };

  try {
    await client.deleteNotificationChannel(request);
    console.log(
      `Notification channel ${notificationChannelId} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Notification channel ${notificationChannelId} not found in project ${projectId}. ` +
          'It may have already been deleted or never existed. No action taken.',
      );
    } else {
      console.error(
        `Error deleting notification channel ${notificationChannelId} in project ${projectId}:`,
        err,
      );
      console.error(
        'Make sure the notification channel ID is correct and you have the necessary permissions.',
      );
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_delete_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteNotificationChannel(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID (for example, 'YOUR_PROJECT_ID')
 - Notification Channel ID (for example, 'YOUR_NOTIFICATION_CHANNEL_ID')

Usage:
  node deleteNotificationChannel.js YOUR_PROJECT_ID YOUR_NOTIFICATION_CHANNEL_ID
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteNotificationChannel,
};
