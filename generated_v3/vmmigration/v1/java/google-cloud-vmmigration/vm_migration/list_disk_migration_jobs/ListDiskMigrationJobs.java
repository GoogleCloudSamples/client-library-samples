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

// [START vmmigration_v1_vmmigration_diskmigrationjobs_list]
import com.google.cloud.vmmigration.v1.DiskMigrationJob;
import com.google.cloud.vmmigration.v1.SourceName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;

public class ListDiskMigrationJobs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String sourceId = "example-source-id";
    listDiskMigrationJobs(projectId, locationId, sourceId);
  }

  public static void listDiskMigrationJobs(String projectId, String locationId, String sourceId)
      throws Exception {
    // Initialize client that will be closed when the block finishes
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = SourceName.of(projectId, locationId, sourceId).toString();
      for (DiskMigrationJob diskMigrationJob : client.listDiskMigrationJobs(parent).iterateAll()) {
        System.out.println("Disk migration job: " + diskMigrationJob.getName());
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_diskmigrationjobs_list]
