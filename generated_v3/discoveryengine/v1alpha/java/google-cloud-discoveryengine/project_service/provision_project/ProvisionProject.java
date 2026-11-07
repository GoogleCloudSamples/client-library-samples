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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_projectservice_provision_project]
import com.google.cloud.discoveryengine.v1alpha.Project;
import com.google.cloud.discoveryengine.v1alpha.ProjectName;
import com.google.cloud.discoveryengine.v1alpha.ProjectServiceClient;
import com.google.cloud.discoveryengine.v1alpha.ProvisionProjectRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ProvisionProject {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    provisionProject(projectId);
  }

  public static void provisionProject(String projectId) throws Exception {
    try (ProjectServiceClient client = ProjectServiceClient.create()) {
      boolean acceptDataUseTerms = true;
      String dataUseTermsVersion = "2022-11-23";
      String name = ProjectName.of(projectId).toString();

      ProvisionProjectRequest request =
          ProvisionProjectRequest.newBuilder()
              .setName(name)
              .setAcceptDataUseTerms(acceptDataUseTerms)
              .setDataUseTermsVersion(dataUseTermsVersion)
              .build();

      // Wait for the long-running operation to complete.
      Project response = client.provisionProjectAsync(request).get(10, TimeUnit.MINUTES);
      System.out.println("Provisioned project: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_projectservice_provision_project]
