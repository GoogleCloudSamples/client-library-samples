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

package com.google.cloud.discoveryengine.v1beta;

// [START discoveryengine_v1beta_projectservice_provision_project]
import com.google.cloud.discoveryengine.v1beta.Project;
import com.google.cloud.discoveryengine.v1beta.ProjectServiceClient;
import com.google.cloud.discoveryengine.v1beta.ProvisionProjectRequest;

public class ProvisionProject {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    provisionProject(projectId);
  }

  public static void provisionProject(String projectId) throws Exception {
    try (ProjectServiceClient client = ProjectServiceClient.create()) {
      String dataUseTermsVersion = "2022-11-23";
      boolean acceptDataUseTerms = true;
      String name = String.format("projects/%s", projectId);

      ProvisionProjectRequest request =
          ProvisionProjectRequest.newBuilder()
              .setName(name)
              .setAcceptDataUseTerms(acceptDataUseTerms)
              .setDataUseTermsVersion(dataUseTermsVersion)
              .build();

      // ProvisionProject is a long-running operation; wait for it to complete.
      Project response = client.provisionProjectAsync(request).get();
      System.out.println("Project provisioned: " + response.getName());
    }
  }
}
// [END discoveryengine_v1beta_projectservice_provision_project]
