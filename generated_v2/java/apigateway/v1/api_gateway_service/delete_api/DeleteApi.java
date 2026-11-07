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

// [START apigateway_v1_apigatewayservice_api_delete]
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.cloud.apigateway.v1.ApiName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteApi {

  public static void main(String[] args)
      throws IOException, InterruptedException, ExecutionException, TimeoutException {
    String projectId = args[0];
    String apiId = args[1];
    deleteApi(projectId, apiId);
  }

  public static void deleteApi(String projectId, String apiId)
      throws IOException, InterruptedException, ExecutionException, TimeoutException {
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String name = ApiName.of(projectId, apiId).toString();
      client.deleteApiAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted API: " + name);
    }
  }
}
// [END apigateway_v1_apigatewayservice_api_delete]
