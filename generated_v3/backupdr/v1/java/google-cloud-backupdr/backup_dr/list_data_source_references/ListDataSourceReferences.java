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

// [START backupdr_v1_backupdr_datasourcereferences_list]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.DataSourceReference;
import com.google.cloud.backupdr.v1.ListDataSourceReferencesRequest;
import java.io.IOException;

public class ListDataSourceReferences {

  public static void listDataSourceReferences(String projectId, String locationId)
      throws IOException {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListDataSourceReferencesRequest request =
          ListDataSourceReferencesRequest.newBuilder().setParent(parent).build();

      for (DataSourceReference dataSourceReference :
          client.listDataSourceReferences(request).iterateAll()) {
        System.out.println("Data source reference: " + dataSourceReference.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdr_datasourcereferences_list]
