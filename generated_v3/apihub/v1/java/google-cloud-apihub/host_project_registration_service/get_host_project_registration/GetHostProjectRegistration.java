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

// [START apihub_v1_hostprojectregistrationservice_hostprojectregistration_get]
import com.google.cloud.apihub.v1.HostProjectRegistration;
import com.google.cloud.apihub.v1.HostProjectRegistrationName;
import com.google.cloud.apihub.v1.HostProjectRegistrationServiceClient;

public class GetHostProjectRegistration {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String hostProjectRegistrationId = "example-host_project_registration_id";
    getHostProjectRegistration(projectId, locationId, hostProjectRegistrationId);
  }

  public static void getHostProjectRegistration(
      String projectId, String locationId, String hostProjectRegistrationId) throws Exception {
    // Initialize client that manages API calls and lifecycle
    try (HostProjectRegistrationServiceClient client =
        HostProjectRegistrationServiceClient.create()) {
      String name =
          HostProjectRegistrationName.of(projectId, locationId, hostProjectRegistrationId)
              .toString();

      HostProjectRegistration response = client.getHostProjectRegistration(name);

      System.out.println("Host Project Registration: " + response.getName());
      System.out.println("GCP Project: " + response.getGcpProject());
      System.out.println("Create Time: " + response.getCreateTime());
    }
  }
}
// [END apihub_v1_hostprojectregistrationservice_hostprojectregistration_get]
