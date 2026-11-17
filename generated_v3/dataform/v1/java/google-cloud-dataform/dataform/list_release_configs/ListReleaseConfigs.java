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

// [START dataform_v1_dataform_releaseconfigs_list]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.ReleaseConfig;
import com.google.cloud.dataform.v1.RepositoryName;
import java.io.IOException;

public class ListReleaseConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    listReleaseConfigs(projectId, locationId, repositoryId);
  }

  public static void listReleaseConfigs(String projectId, String locationId, String repositoryId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();
      for (ReleaseConfig releaseConfig : client.listReleaseConfigs(parent).iterateAll()) {
        System.out.println("Release config name: " + releaseConfig.getName());
        System.out.println("Git commitish: " + releaseConfig.getGitCommitish());
        System.out.println("Cron schedule: " + releaseConfig.getCronSchedule());
      }
    }
  }
}
// [END dataform_v1_dataform_releaseconfigs_list]
