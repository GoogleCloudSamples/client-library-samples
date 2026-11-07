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

// [START monitoring_v3_notificationchannelservice_notificationchannel_update]
import com.google.cloud.monitoring.v3.NotificationChannelServiceClient;
import com.google.monitoring.v3.NotificationChannel;
import com.google.monitoring.v3.NotificationChannelName;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateNotificationChannel {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String notificationChannelId = "example-notification-channel-id";
    updateNotificationChannel(projectId, notificationChannelId);
  }

  public static void updateNotificationChannel(String projectId, String notificationChannelId)
      throws Exception {
    try (NotificationChannelServiceClient client = NotificationChannelServiceClient.create()) {
      NotificationChannel notificationChannel =
          NotificationChannel.newBuilder()
              .setName(NotificationChannelName.of(projectId, notificationChannelId).toString())
              .setDisplayName("Updated Alert Channel")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      NotificationChannel response =
          client.updateNotificationChannel(updateMask, notificationChannel);
      System.out.println("Updated notification channel: " + response.getName());
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_update]
