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

package com.google.cloud.dataform.v1beta1;

// [START dataform_v1beta1_dataform_repository_get]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.GetRepositoryRequest;
import com.google.cloud.dataform.v1beta1.Repository;
import com.google.cloud.dataform.v1beta1.RepositoryName;

public class GetRepository {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    getRepository(projectId, locationId, repositoryId);
  }

  public static void getRepository(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      GetRepositoryRequest request = GetRepositoryRequest.newBuilder()
          .setName(name)
          .build();

      Repository repository = client.getRepository(request);
      System.out.println("Retrieved repository: " + repository.getName());
    }
  }
}
// [END dataform_v1beta1_dataform_repository_get]
