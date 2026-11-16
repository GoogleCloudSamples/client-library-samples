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

package com.google.cloud.apigateway.v1;

// [START apigateway_v1_apigatewayservice_apiconfig_delete]
import com.google.cloud.apigateway.v1.ApiConfigName;
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.cloud.apigateway.v1.DeleteApiConfigRequest;

public class DeleteApiConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String apiId = "example-api_id";
    String apiConfigId = "example-api_config_id";
    deleteApiConfig(projectId, apiId, apiConfigId);
  }

  public static void deleteApiConfig(String projectId, String apiId, String apiConfigId)
      throws Exception {
    // Initialize the client. This client can be reused across multiple requests.
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String name = ApiConfigName.of(projectId, apiId, apiConfigId).toString();
      DeleteApiConfigRequest request = DeleteApiConfigRequest.newBuilder().setName(name).build();

      // DeleteApiConfig is a long-running operation; wait for it to complete.
      client.deleteApiConfigAsync(request).get();
      System.out.println("Deleted API config: " + name);
    }
  }
}
// [END apigateway_v1_apigatewayservice_apiconfig_delete]
