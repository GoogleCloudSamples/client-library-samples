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

// [START apihub_v1_hostprojectregistrationservice_hostprojectregistrations_list]
import com.google.cloud.apihub.v1.HostProjectRegistration;
import com.google.cloud.apihub.v1.HostProjectRegistrationServiceClient;
import com.google.cloud.apihub.v1.LocationName;
import java.io.IOException;

public class ListHostProjectRegistrations {

  public static void listHostProjectRegistrations(String projectId, String locationId)
      throws IOException {
    try (HostProjectRegistrationServiceClient client =
        HostProjectRegistrationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (HostProjectRegistration registration :
          client.listHostProjectRegistrations(parent).iterateAll()) {
        System.out.println("Host project registration name: " + registration.getName());
        System.out.println("GCP project: " + registration.getGcpProject());
      }
    }
  }
}
// [END apihub_v1_hostprojectregistrationservice_hostprojectregistrations_list]
