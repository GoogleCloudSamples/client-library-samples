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

// [START apigateway_v1_apigatewayservice_apiconfig_create]
import com.google.cloud.apigateway.v1.ApiConfig;
import com.google.cloud.apigateway.v1.ApiGatewayServiceClient;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateApiConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String apiId = "example-api-id";
    String apiConfigId = "example-api-config-id";
    createApiConfig(projectId, apiId, apiConfigId);
  }

  public static void createApiConfig(String projectId, String apiId, String apiConfigId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ApiGatewayServiceClient client = ApiGatewayServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global/apis/%s", projectId, apiId);

      String openApiSpec =
          "swagger: '2.0'\n"
              + "info:\n"
              + "  title: Example API\n"
              + "  version: 1.0.0\n"
              + "schemes:\n"
              + "  - https\n"
              + "produces:\n"
              + "  - application/json\n"
              + "paths:\n"
              + "  /hello:\n"
              + "    get:\n"
              + "      summary: Example endpoint\n"
              + "      operationId: hello\n"
              + "      x-google-backend:\n"
              + "        address: https://example.com\n"
              + "      responses:\n"
              + "        '200':\n"
              + "          description: A successful response\n"
              + "          schema:\n"
              + "            type: string\n";

      ApiConfig.File openApiFile =
          ApiConfig.File.newBuilder()
              .setPath("openapi.yaml")
              .setContents(ByteString.copyFromUtf8(openApiSpec))
              .build();

      ApiConfig.OpenApiDocument openApiDocument =
          ApiConfig.OpenApiDocument.newBuilder().setDocument(openApiFile).build();

      ApiConfig apiConfig =
          ApiConfig.newBuilder()
              .setDisplayName("Example API Config")
              .addOpenapiDocuments(openApiDocument)
              .build();

      // Wait for the long-running operation to complete
      ApiConfig response =
          client.createApiConfigAsync(parent, apiConfig, apiConfigId).get(10, TimeUnit.MINUTES);

      System.out.println("Created API config: " + response.getName());
    }
  }
}
// [END apigateway_v1_apigatewayservice_apiconfig_create]
