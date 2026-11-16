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

package com.google.cloud.alloydb.v1;

// [START alloydb_v1_alloydbadmin_backups_list]
import com.google.cloud.alloydb.v1.AlloyDBAdminClient;
import com.google.cloud.alloydb.v1.Backup;
import com.google.cloud.alloydb.v1.LocationName;
import java.io.IOException;

public class ListBackups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    listBackups(projectId, locationId);
  }

  // Lists all AlloyDB backups within the specified project and location.
  public static void listBackups(String projectId, String locationId) throws Exception {
    try (AlloyDBAdminClient client = AlloyDBAdminClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Backup backup : client.listBackups(parent).iterateAll()) {
        System.out.println("Backup name: " + backup.getName());
        System.out.println("Backup state: " + backup.getState());
        System.out.println("Source cluster: " + backup.getClusterName());
      }
    }
  }
}
// [END alloydb_v1_alloydbadmin_backups_list]
