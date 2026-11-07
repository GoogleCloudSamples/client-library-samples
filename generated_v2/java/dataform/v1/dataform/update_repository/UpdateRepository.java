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

package com.google.cloud.dataform.v1;

// [START dataform_v1_dataform_repository_update]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.Repository;
import com.google.cloud.dataform.v1.RepositoryName;
import com.google.protobuf.FieldMask;

public class UpdateRepository {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    updateRepository(projectId, locationId, repositoryId);
  }

  public static void updateRepository(String projectId, String locationId, String repositoryId) throws Exception {
    try (DataformClient client = DataformClient.create()) {
      Repository repository =
          Repository.newBuilder()
              .setName(RepositoryName.of(projectId, locationId, repositoryId).toString())
              .setDisplayName("Updated Repository Display Name")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Repository response = client.updateRepository(repository, updateMask);
      System.out.println("Updated repository: " + response.getName());
    }
  }
}
// [END dataform_v1_dataform_repository_update]
