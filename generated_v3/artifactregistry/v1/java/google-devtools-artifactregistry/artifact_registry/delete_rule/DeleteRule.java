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

// [START artifactregistry_v1_artifactregistry_rule_delete]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.DeleteRuleRequest;
import com.google.devtools.artifactregistry.v1.RuleName;

public class DeleteRule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String ruleId = "example-rule-id";
    deleteRule(projectId, locationId, repositoryId, ruleId);
  }

  public static void deleteRule(
      String projectId, String locationId, String repositoryId, String ruleId) throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name = RuleName.of(projectId, locationId, repositoryId, ruleId).toString();

      DeleteRuleRequest request = DeleteRuleRequest.newBuilder().setName(name).build();

      client.deleteRule(request);
      System.out.println("Rule deleted successfully: " + name);
    }
  }
}
// [END artifactregistry_v1_artifactregistry_rule_delete]
