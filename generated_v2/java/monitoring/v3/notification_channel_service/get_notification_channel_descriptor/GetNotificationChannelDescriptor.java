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

// [START monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
import com.google.cloud.monitoring.v3.NotificationChannelServiceClient;
import com.google.monitoring.v3.NotificationChannelDescriptor;
import com.google.monitoring.v3.NotificationChannelDescriptorName;

public class GetNotificationChannelDescriptor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String notificationChannelDescriptorId = "example-notification_channel_descriptor_id";
    getNotificationChannelDescriptor(projectId, notificationChannelDescriptorId);
  }

  public static void getNotificationChannelDescriptor(
      String projectId, String notificationChannelDescriptorId) throws Exception {
    // Initialize client using Application Default Credentials (ADC).
    try (NotificationChannelServiceClient client = NotificationChannelServiceClient.create()) {
      String name =
          NotificationChannelDescriptorName.format(projectId, notificationChannelDescriptorId);

      NotificationChannelDescriptor descriptor = client.getNotificationChannelDescriptor(name);

      System.out.println("Descriptor name: " + descriptor.getName());
      System.out.println("Channel type: " + descriptor.getType());
      System.out.println("Display name: " + descriptor.getDisplayName());
      System.out.println("Description: " + descriptor.getDescription());
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
