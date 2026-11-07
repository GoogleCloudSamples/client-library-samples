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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
import com.google.cloud.gdchardwaremanagement.v1alpha.Contact;
import com.google.cloud.gdchardwaremanagement.v1alpha.CreateZoneRequest;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.LocationName;
import com.google.cloud.gdchardwaremanagement.v1alpha.Zone;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateZone {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String zoneId = "example-zone-id";
    createZone(projectId, locationId, zoneId);
  }

  public static void createZone(String projectId, String locationId, String zoneId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Zone zone =
          Zone.newBuilder()
              .setDisplayName("Example Zone")
              .addContacts(
                  Contact.newBuilder()
                      .setGivenName("Alex")
                      .setEmail("alex@example.com")
                      .setPhone("+15550100200")
                      .build())
              .build();

      CreateZoneRequest request =
          CreateZoneRequest.newBuilder()
              .setParent(parent)
              .setZoneId(zoneId)
              .setZone(zone)
              .build();

      // Submit the asynchronous long-running operation request and wait for completion
      Zone response = client.createZoneAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Created zone: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
