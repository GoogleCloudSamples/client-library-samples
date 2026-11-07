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

// [START apigateway_v1_apigatewayservice_api_create]
import com.google.cloud.apigateway.v1.Api;
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.cloud.apigateway.v1.LocationName;
import java.util.concurrent.TimeUnit;

public class CreateApi {

  public static void createApi(String projectId, String apiId) throws Exception {
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String parent = LocationName.of(projectId, "global").toString();
      Api api = Api.newBuilder().setDisplayName("Example API").build();

      // Initialize the asynchronous operation to create the API
      Api response = client.createApiAsync(parent, api, apiId).get(10, TimeUnit.MINUTES);
      System.out.println("API created: " + response.getName());
    }
  }
}
// [END apigateway_v1_apigatewayservice_api_create]
