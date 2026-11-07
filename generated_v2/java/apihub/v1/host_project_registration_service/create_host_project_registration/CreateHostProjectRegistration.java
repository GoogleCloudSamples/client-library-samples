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

package com.google.cloud.apihub.v1;

// [START apihub_v1_hostprojectregistrationservice_hostprojectregistration_create]
import com.google.cloud.apihub.v1.CreateHostProjectRegistrationRequest;
import com.google.cloud.apihub.v1.HostProjectRegistration;
import com.google.cloud.apihub.v1.HostProjectRegistrationServiceClient;

public class CreateHostProjectRegistration {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String hostProjectRegistrationId = "example-host_project_registration_id";
    createHostProjectRegistration(projectId, locationId, hostProjectRegistrationId);
  }

  public static void createHostProjectRegistration(
      String projectId, String locationId, String hostProjectRegistrationId) throws Exception {
    try (HostProjectRegistrationServiceClient client =
        HostProjectRegistrationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      HostProjectRegistration hostProjectRegistration =
          HostProjectRegistration.newBuilder()
              .setGcpProject(String.format("projects/%s", hostProjectRegistrationId))
              .build();

      CreateHostProjectRegistrationRequest request =
          CreateHostProjectRegistrationRequest.newBuilder()
              .setParent(parent)
              .setHostProjectRegistrationId(hostProjectRegistrationId)
              .setHostProjectRegistration(hostProjectRegistration)
              .build();

      HostProjectRegistration response = client.createHostProjectRegistration(request);
      System.out.println("Host project registration created: " + response.getName());
    }
  }
}
// [END apihub_v1_hostprojectregistrationservice_hostprojectregistration_create]
