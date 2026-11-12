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

package com.google.cloud.gsuiteaddons.v1;

// [START gsuiteaddons_v1_gsuiteaddons_deployments_list]
import com.google.cloud.gsuiteaddons.v1.Deployment;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import com.google.cloud.gsuiteaddons.v1.ProjectName;

public class ListDeployments {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listDeployments(projectId);
  }

  public static void listDeployments(String projectId) throws Exception {
    // Initializes client with Application Default Credentials.
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String parent = ProjectName.of(projectId).toString();

      for (Deployment deployment : client.listDeployments(parent).iterateAll()) {
        System.out.printf("Deployment Name: %s%n", deployment.getName());
      }
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_deployments_list]
