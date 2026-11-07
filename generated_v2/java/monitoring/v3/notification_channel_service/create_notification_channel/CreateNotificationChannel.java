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

// [START monitoring_v3_notificationchannelservice_notificationchannel_create]
import com.google.cloud.monitoring.v3.NotificationChannelServiceClient;
import com.google.monitoring.v3.NotificationChannel;
import java.io.IOException;

public class CreateNotificationChannel {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    createNotificationChannel(projectId);
  }

  public static void createNotificationChannel(String projectId) throws Exception {
    try (NotificationChannelServiceClient client = NotificationChannelServiceClient.create()) {
      String name = "projects/" + projectId;
      NotificationChannel notificationChannel =
          NotificationChannel.newBuilder()
              .setType("email")
              .setDisplayName("Alert Notification Channel")
              .putLabels("email_address", "alerts@example.com")
              .build();

      NotificationChannel response = client.createNotificationChannel(name, notificationChannel);
      System.out.println("Created notification channel: " + response.getName());
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_create]
