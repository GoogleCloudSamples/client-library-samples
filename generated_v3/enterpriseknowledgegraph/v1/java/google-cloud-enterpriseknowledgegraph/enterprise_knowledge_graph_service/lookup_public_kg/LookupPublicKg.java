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

package com.google.cloud.enterpriseknowledgegraph.v1;

// [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup_public_kg]
import com.google.cloud.enterpriseknowledgegraph.v1.EnterpriseKnowledgeGraphServiceClient;
import com.google.cloud.enterpriseknowledgegraph.v1.LookupPublicKgRequest;
import com.google.cloud.enterpriseknowledgegraph.v1.LookupPublicKgResponse;

public class LookupPublicKg {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String ids = "example-id";
    lookupPublicKg(projectId, locationId, ids);
  }

  public static void lookupPublicKg(String projectId, String locationId, String ids)
      throws Exception {
    // Initialize client with Application Default Credentials
    try (EnterpriseKnowledgeGraphServiceClient client =
        EnterpriseKnowledgeGraphServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      LookupPublicKgRequest request =
          LookupPublicKgRequest.newBuilder()
              .setParent(parent)
              .addIds(ids)
              .build();

      LookupPublicKgResponse response = client.lookupPublicKg(request);
      System.out.println("Lookup result: " + response.getItemListElement());
    }
  }
}
// [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup_public_kg]
