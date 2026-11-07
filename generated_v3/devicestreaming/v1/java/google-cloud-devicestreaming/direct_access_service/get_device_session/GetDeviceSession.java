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

// [START devicestreaming_v1_directaccessservice_devicesession_get]
import com.google.cloud.devicestreaming.v1.DeviceSession;
import com.google.cloud.devicestreaming.v1.DeviceSessionName;
import com.google.cloud.devicestreaming.v1.DirectAccessServiceClient;

public class GetDeviceSession {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String deviceSessionId = "example-device-session-id";
    getDeviceSession(projectId, deviceSessionId);
  }

  public static void getDeviceSession(String projectId, String deviceSessionId) throws Exception {
    // Initialize the client. Reuse client instances across requests when possible.
    try (DirectAccessServiceClient client = DirectAccessServiceClient.create()) {
      String name = DeviceSessionName.of(projectId, deviceSessionId).toString();
      DeviceSession deviceSession = client.getDeviceSession(name);

      System.out.println("Retrieved device session: " + deviceSession.getName());
      System.out.println("Device session state: " + deviceSession.getState());
    }
  }
}
// [END devicestreaming_v1_directaccessservice_devicesession_get]
