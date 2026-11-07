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

// [START artifactregistry_v1_artifactregistry_rule_update]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.Rule;
import com.google.devtools.artifactregistry.v1.RuleName;
import com.google.protobuf.FieldMask;

public class UpdateRule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String ruleId = "example-rule-id";
    updateRule(projectId, locationId, repositoryId, ruleId);
  }

  public static void updateRule(
      String projectId, String locationId, String repositoryId, String ruleId) throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      // Modifying the action alters package download behavior.
      // Ensure target is a demonstration or test resource.
      Rule rule =
          Rule.newBuilder()
              .setName(RuleName.of(projectId, locationId, repositoryId, ruleId).toString())
              .setAction(Rule.Action.ALLOW)
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("action").build();

      Rule response = client.updateRule(rule, updateMask);
      System.out.println("Updated rule: " + response.getName());
      System.out.println("Action: " + response.getAction());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_rule_update]
