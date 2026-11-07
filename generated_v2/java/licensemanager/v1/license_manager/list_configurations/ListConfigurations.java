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

package com.google.cloud.licensemanager.v1;

// [START licensemanager_v1_licensemanager_configurations_list]
import com.google.cloud.licensemanager.v1.Configuration;
import com.google.cloud.licensemanager.v1.LicenseManagerClient;
import java.io.IOException;

public class ListConfigurations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listConfigurations(projectId, locationId);
  }

  public static void listConfigurations(String projectId, String locationId) throws Exception {
    try (LicenseManagerClient client = LicenseManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Configuration configuration : client.listConfigurations(parent).iterateAll()) {
        System.out.println("Configuration name: " + configuration.getName());
      }
    }
  }
}
// [END licensemanager_v1_licensemanager_configurations_list]
