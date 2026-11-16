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

// [START apigateway_v1_apigatewayservice_apiconfig_update]
import com.google.cloud.apigateway.v1.ApiConfig;
import com.google.cloud.apigateway.v1.ApiConfigName;
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.protobuf.FieldMask;

public class UpdateApiConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String apiId = "example-api-id";
    String apiConfigId = "example-api-config-id";
    updateApiConfig(projectId, apiId, apiConfigId);
  }

  public static void updateApiConfig(String projectId, String apiId, String apiConfigId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      ApiConfig apiConfig =
          ApiConfig.newBuilder()
              .setName(ApiConfigName.of(projectId, apiId, apiConfigId).toString())
              .setDisplayName("Updated Display Name")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // UpdateApiConfig is a long-running operation; wait for it to complete.
      ApiConfig response = client.updateApiConfigAsync(apiConfig, updateMask).get();
      System.out.println("Updated API config: " + response.getName());
    }
  }
}
// [END apigateway_v1_apigatewayservice_apiconfig_update]
