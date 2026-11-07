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

// [START monitoring_v3_notificationchannelservice_send_notification_channel_verification_code]
'use strict';

const {NotificationChannelServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Use the sendNotificationChannelVerificationCode method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} notificationChannelId - The server-generated ID of the notification channel.
 */
async function sendNotificationChannelVerificationCode(projectId, notificationChannelId) {
  try {
    const name = `projects/${projectId}/notificationChannels/${notificationChannelId}`;
    const request = {
      name,
    };

    await client.sendNotificationChannelVerificationCode(request);
    console.log(`Verification code sent to notification channel: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Notification channel not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Notification channel state does not support verification: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { sendNotificationChannelVerificationCode };
// [END monitoring_v3_notificationchannelservice_send_notification_channel_verification_code]
