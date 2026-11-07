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

// [START monitoring_v3_notificationchannelservice_notificationchannels_list]
import com.google.cloud.monitoring.v3.NotificationChannelServiceClient;
import com.google.monitoring.v3.NotificationChannel;
import java.io.IOException;

public class ListNotificationChannels {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listNotificationChannels(projectId);
  }

  public static void listNotificationChannels(String projectId) throws Exception {
    try (NotificationChannelServiceClient client = NotificationChannelServiceClient.create()) {
      String name = String.format("projects/%s", projectId);
      for (NotificationChannel channel : client.listNotificationChannels(name).iterateAll()) {
        System.out.println("Channel ID: " + channel.getName());
        System.out.println("Display name: " + channel.getDisplayName());
        System.out.println("Type: " + channel.getType());
      }
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannels_list]
