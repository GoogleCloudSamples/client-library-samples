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

// [START apigateway_v1_apigatewayservice_gateway_delete]
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.cloud.apigateway.v1.GatewayName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteGateway {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String gatewayId = "example-gateway_id";
    deleteGateway(projectId, locationId, gatewayId);
  }

  public static void deleteGateway(String projectId, String locationId, String gatewayId)
      throws Exception {
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String name = GatewayName.of(projectId, locationId, gatewayId).toString();
      client.deleteGatewayAsync(name).get();
      System.out.println("Deleted gateway: " + name);
    }
  }
}
// [END apigateway_v1_apigatewayservice_gateway_delete]
