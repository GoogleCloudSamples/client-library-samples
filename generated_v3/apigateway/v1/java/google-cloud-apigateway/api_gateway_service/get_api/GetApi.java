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

// [START apigateway_v1_apigatewayservice_api_get]
import com.google.cloud.apigateway.v1.Api;
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.cloud.apigateway.v1.ApiName;
import com.google.cloud.apigateway.v1.GetApiRequest;
import java.io.IOException;

public class GetApi {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String apiId = "example-api-id";
    getApi(projectId, apiId);
  }

  public static void getApi(String projectId, String apiId) throws IOException {
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String name = ApiName.of(projectId, apiId).toString();
      GetApiRequest request = GetApiRequest.newBuilder().setName(name).build();
      Api response = client.getApi(request);

      System.out.println("API Name: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END apigateway_v1_apigatewayservice_api_get]
