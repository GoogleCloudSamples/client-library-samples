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

package com.google.cloud.devicestreaming.v1;

// [START devicestreaming_v1_directaccessservice_devicesessions_list]
import com.google.cloud.devicestreaming.v1.DeviceSession;
import com.google.cloud.devicestreaming.v1.DirectAccessServiceClient;
import com.google.cloud.devicestreaming.v1.ListDeviceSessionsRequest;

public class ListDeviceSessions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listDeviceSessions(projectId);
  }

  public static void listDeviceSessions(String projectId) throws Exception {
    // Initialize client within a try-with-resources statement for automatic resource cleanup.
    try (DirectAccessServiceClient client = DirectAccessServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      ListDeviceSessionsRequest request =
          ListDeviceSessionsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (DeviceSession deviceSession : client.listDeviceSessions(request).iterateAll()) {
        System.out.println("Device session: " + deviceSession.getName());
        System.out.println("Device model: " + deviceSession.getAndroidDevice().getAndroidModelId());
        System.out.println("State: " + deviceSession.getState());
      }
    }
  }
}
// [END devicestreaming_v1_directaccessservice_devicesessions_list]
