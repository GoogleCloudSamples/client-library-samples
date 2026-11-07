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

// [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup]
import com.google.cloud.enterpriseknowledgegraph.v1.EnterpriseKnowledgeGraphServiceClient;
import com.google.cloud.enterpriseknowledgegraph.v1.EnterpriseKnowledgeGraphServiceSettings;
import com.google.cloud.enterpriseknowledgegraph.v1.LookupRequest;
import com.google.cloud.enterpriseknowledgegraph.v1.LookupResponse;
import java.io.IOException;

public class Lookup {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String ids = "example-ids";
    lookup(projectId, locationId, ids);
  }

  public static void lookup(String projectId, String locationId, String ids) throws IOException {
    EnterpriseKnowledgeGraphServiceSettings.Builder settingsBuilder =
        EnterpriseKnowledgeGraphServiceSettings.newBuilder();
    if (locationId != null && !locationId.isEmpty() && !"global".equalsIgnoreCase(locationId)) {
      settingsBuilder.setEndpoint(
          String.format("%s-enterpriseknowledgegraph.googleapis.com:443", locationId));
    }

    try (EnterpriseKnowledgeGraphServiceClient client =
        EnterpriseKnowledgeGraphServiceClient.create(settingsBuilder.build())) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      LookupRequest.Builder requestBuilder = LookupRequest.newBuilder().setParent(parent);
      for (String id : ids.split(",")) {
        String trimmedId = id.trim();
        if (trimmedId.startsWith("kg:")) {
          trimmedId = trimmedId.substring(3);
        }
        requestBuilder.addIds(trimmedId);
      }

      LookupRequest request = requestBuilder.build();
      LookupResponse response = client.lookup(request);
      System.out.println("Lookup response: " + response.getItemListElement());
    }
  }
}
// [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup]
