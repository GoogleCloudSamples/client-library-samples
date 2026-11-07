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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_notificationchannelservice_notificationchannel_delete]
import com.google.cloud.monitoring.v3.NotificationChannelServiceClient;
import com.google.monitoring.v3.NotificationChannelName;
import java.io.IOException;

public class DeleteNotificationChannel {

  public static void main(String[] args) throws IOException {
    String notificationChannelId = "example-notification-channel-id";
    String projectId = "example-project-id";
    deleteNotificationChannel(notificationChannelId, projectId);
  }

  public static void deleteNotificationChannel(String notificationChannelId, String projectId)
      throws IOException {
    try (NotificationChannelServiceClient client = NotificationChannelServiceClient.create()) {
      String name = NotificationChannelName.of(projectId, notificationChannelId).toString();
      client.deleteNotificationChannel(name, false);
      System.out.println("Deleted notification channel: " + name);
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_delete]
