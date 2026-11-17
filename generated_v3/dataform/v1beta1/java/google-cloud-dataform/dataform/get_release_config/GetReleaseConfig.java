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

// [START dataform_v1beta1_dataform_releaseconfig_get]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.ReleaseConfig;
import com.google.cloud.dataform.v1beta1.ReleaseConfigName;
import java.io.IOException;

public class GetReleaseConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String releaseConfigId = "example-release-config-id";
    getReleaseConfig(projectId, locationId, repositoryId, releaseConfigId);
  }

  public static void getReleaseConfig(
      String projectId, String locationId, String repositoryId, String releaseConfigId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String name =
          ReleaseConfigName.of(projectId, locationId, repositoryId, releaseConfigId).toString();

      ReleaseConfig response = client.getReleaseConfig(name);
      System.out.println("Retrieved release config: " + response.getName());
      System.out.println("Git commitish: " + response.getGitCommitish());
    }
  }
}
// [END dataform_v1beta1_dataform_releaseconfig_get]
