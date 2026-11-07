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

package com.google.cloud.cloudfunctions.v2alpha;

// [START cloudfunctions_v2alpha_functionservice_runtimes_list]
import com.google.cloud.functions.v2alpha.FunctionServiceClient;
import com.google.cloud.functions.v2alpha.ListRuntimesRequest;
import com.google.cloud.functions.v2alpha.ListRuntimesResponse;
import com.google.cloud.functions.v2alpha.LocationName;
import java.io.IOException;

public class ListRuntimes {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    listRuntimes(projectId, locationId);
  }

  public static void listRuntimes(String projectId, String locationId) throws IOException {
    // Initialize the client that handles API communication using Application Default Credentials
    try (FunctionServiceClient client = FunctionServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListRuntimesRequest request =
          ListRuntimesRequest.newBuilder()
              .setParent(parent)
              .build();

      ListRuntimesResponse response = client.listRuntimes(request);
      for (ListRuntimesResponse.Runtime runtime : response.getRuntimesList()) {
        System.out.printf("Name: %s%n", runtime.getName());
        System.out.printf("Display Name: %s%n", runtime.getDisplayName());
        System.out.printf("Stage: %s%n", runtime.getStage());
        System.out.printf("Environment: %s%n", runtime.getEnvironment());
      }
    }
  }
}
// [END cloudfunctions_v2alpha_functionservice_runtimes_list]
