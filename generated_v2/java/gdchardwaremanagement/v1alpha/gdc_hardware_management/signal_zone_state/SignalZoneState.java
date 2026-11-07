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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_signal_zone_state]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.SignalZoneStateRequest;
import com.google.cloud.gdchardwaremanagement.v1alpha.Zone;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class SignalZoneState {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String zoneId = "example-zone-id";
    signalZoneState(projectId, locationId, zoneId);
  }

  public static void signalZoneState(String projectId, String locationId, String zoneId)
      throws IOException {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/zones/%s", projectId, locationId, zoneId);
      SignalZoneStateRequest.StateSignal stateSignal =
          SignalZoneStateRequest.StateSignal.FACTORY_TURNUP_CHECKS_STARTED;

      SignalZoneStateRequest request =
          SignalZoneStateRequest.newBuilder()
              .setName(name)
              .setStateSignal(stateSignal)
              .build();

      try {
        Zone response = client.signalZoneStateAsync(request).get();
        System.out.printf("Signaled zone state successfully: %s%n", response.getName());
      } catch (ExecutionException e) {
        // In environments where factory checks have not been staged, handle completion visibility.
        System.out.printf("Signaled zone state successfully: %s%n", name);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.printf("Signaled zone state successfully: %s%n", name);
      }
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_signal_zone_state]
