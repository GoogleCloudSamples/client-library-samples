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

package com.google.cloud.vmmigration.v1;

// [START vmmigration_v1_vmmigration_imageimports_list]
import com.google.cloud.vmmigration.v1.ImageImport;
import com.google.cloud.vmmigration.v1.VmMigrationClient;
import java.io.IOException;

public class ListImageImports {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listImageImports(projectId, locationId);
  }

  public static void listImageImports(String projectId, String locationId) throws Exception {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (ImageImport imageImport : client.listImageImports(parent).iterateAll()) {
        System.out.println("Image import: " + imageImport.getName());
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_imageimports_list]
