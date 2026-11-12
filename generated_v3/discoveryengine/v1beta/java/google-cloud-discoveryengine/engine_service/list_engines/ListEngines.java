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

// [START discoveryengine_v1beta_engineservice_engines_list]
import com.google.cloud.discoveryengine.v1beta.Engine;
import com.google.cloud.discoveryengine.v1beta.EngineServiceClient;
import com.google.cloud.discoveryengine.v1beta.ListEnginesRequest;
import java.io.IOException;

public class ListEngines {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String collectionId = "example-collection_id";
    listEngines(projectId, locationId, collectionId);
  }

  public static void listEngines(String projectId, String locationId, String collectionId)
      throws IOException {
    try (EngineServiceClient client = EngineServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      ListEnginesRequest request = ListEnginesRequest.newBuilder().setParent(parent).build();

      for (Engine engine : client.listEngines(request).iterateAll()) {
        System.out.println("Engine: " + engine.getName());
        System.out.println("Display Name: " + engine.getDisplayName());
      }
    }
  }
}
// [END discoveryengine_v1beta_engineservice_engines_list]
