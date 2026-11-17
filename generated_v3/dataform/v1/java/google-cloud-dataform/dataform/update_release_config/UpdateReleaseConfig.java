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

// [START dataform_v1_dataform_releaseconfig_update]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.ReleaseConfig;
import com.google.cloud.dataform.v1.ReleaseConfigName;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateReleaseConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String releaseConfigId = "example-release-config-id";
    updateReleaseConfig(projectId, locationId, repositoryId, releaseConfigId);
  }

  public static void updateReleaseConfig(
      String projectId, String locationId, String repositoryId, String releaseConfigId)
      throws IOException {
    // Initialize client that will be closed when the block finishes
    try (DataformClient client = DataformClient.create()) {
      ReleaseConfig releaseConfig =
          ReleaseConfig.newBuilder()
              .setName(
                  ReleaseConfigName.of(projectId, locationId, repositoryId, releaseConfigId)
                      .toString())
              .setGitCommitish("main")
              .setDisabled(true)
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("disabled").build();

      ReleaseConfig response = client.updateReleaseConfig(releaseConfig, updateMask);
      System.out.println("Updated release config: " + response.getName());
    }
  }
}
// [END dataform_v1_dataform_releaseconfig_update]
