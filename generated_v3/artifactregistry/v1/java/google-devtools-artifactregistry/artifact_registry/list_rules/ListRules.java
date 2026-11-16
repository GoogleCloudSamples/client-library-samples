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

// [START artifactregistry_v1_artifactregistry_rules_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.ListRulesRequest;
import com.google.devtools.artifactregistry.v1.RepositoryName;
import com.google.devtools.artifactregistry.v1.Rule;
import java.io.IOException;

public class ListRules {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listRules(projectId, locationId, repositoryId);
  }

  public static void listRules(String projectId, String locationId, String repositoryId)
      throws IOException {
    // Initialize the client that sends requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();

      ListRulesRequest request = ListRulesRequest.newBuilder().setParent(parent).build();

      for (Rule rule : client.listRules(request).iterateAll()) {
        System.out.println("Rule: " + rule.getName());
        System.out.println("Action: " + rule.getAction());
        System.out.println("Operation: " + rule.getOperation());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_rules_list]
