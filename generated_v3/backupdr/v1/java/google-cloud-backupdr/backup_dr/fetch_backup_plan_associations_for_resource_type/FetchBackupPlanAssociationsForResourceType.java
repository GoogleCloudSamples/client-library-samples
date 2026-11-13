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

package com.google.cloud.backupdr.v1;

// [START backupdr_v1_backupdr_fetch_backup_plan_associations_for_resource_type]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupPlanAssociation;
import com.google.cloud.backupdr.v1.FetchBackupPlanAssociationsForResourceTypeRequest;

public class FetchBackupPlanAssociationsForResourceType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String resourceType = "sql.googleapis.com/Instance";
    fetchBackupPlanAssociationsForResourceType(projectId, locationId, resourceType);
  }

  public static void fetchBackupPlanAssociationsForResourceType(
      String projectId, String locationId, String resourceType) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      FetchBackupPlanAssociationsForResourceTypeRequest request =
          FetchBackupPlanAssociationsForResourceTypeRequest.newBuilder()
              .setParent(parent)
              .setResourceType(resourceType)
              .build();

      for (BackupPlanAssociation association :
          client.fetchBackupPlanAssociationsForResourceType(request).iterateAll()) {
        System.out.println("Backup plan association: " + association.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdr_fetch_backup_plan_associations_for_resource_type]
