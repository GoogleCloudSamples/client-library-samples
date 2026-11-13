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

package com.google.cloud.artifactregistry.v1;

// [START artifactregistry_v1_artifactregistry_rule_create]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.CreateRuleRequest;
import com.google.devtools.artifactregistry.v1.RepositoryName;
import com.google.devtools.artifactregistry.v1.Rule;
import java.io.IOException;

public class CreateRule {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String ruleId = "example-rule-id";
    createRule(projectId, locationId, repositoryId, ruleId);
  }

  public static void createRule(
      String projectId, String locationId, String repositoryId, String ruleId) throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();
      Rule rule =
          Rule.newBuilder()
              .setAction(Rule.Action.ALLOW)
              .setOperation(Rule.Operation.DOWNLOAD)
              .build();

      CreateRuleRequest request =
          CreateRuleRequest.newBuilder()
              .setParent(parent)
              .setRuleId(ruleId)
              .setRule(rule)
              .build();

      Rule response = client.createRule(request);
      System.out.println("Created rule: " + response.getName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_rule_create]
