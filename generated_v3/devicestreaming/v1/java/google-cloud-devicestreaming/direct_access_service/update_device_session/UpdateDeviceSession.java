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

// [START devicestreaming_v1_directaccessservice_devicesession_update]
import com.google.cloud.devicestreaming.v1.DeviceSession;
import com.google.cloud.devicestreaming.v1.DirectAccessServiceClient;
import com.google.protobuf.Duration;
import com.google.protobuf.FieldMask;

public class UpdateDeviceSession {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String deviceSessionId = "example-device-session-id";
    updateDeviceSession(projectId, deviceSessionId);
  }

  public static void updateDeviceSession(String projectId, String deviceSessionId)
      throws Exception {
    try (DirectAccessServiceClient client = DirectAccessServiceClient.create()) {
      // Extend the session duration by setting a new time to live
      DeviceSession deviceSession =
          DeviceSession.newBuilder()
              .setName(String.format("projects/%s/deviceSessions/%s", projectId, deviceSessionId))
              .setTtl(Duration.newBuilder().setSeconds(1800).build())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("ttl").build();

      DeviceSession response = client.updateDeviceSession(deviceSession, updateMask);
      System.out.println("Updated device session: " + response.getName());
    }
  }
}
// [END devicestreaming_v1_directaccessservice_devicesession_update]
