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

package com.google.cloud.retail.v2;

// [START retail_v2_catalogservice_completionconfig_get]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2.CatalogServiceClient;
import com.google.cloud.retail.v2.CompletionConfig;
import com.google.cloud.retail.v2.CompletionConfigName;
import com.google.cloud.retail.v2.GetCompletionConfigRequest;
import java.io.IOException;

public class GetCompletionConfig {

  public static void main(String[] args) throws IOException {
    String locationId = "global";
    String catalogId = "default_catalog";
    String projectId = "example-project-id";
    getCompletionConfig(locationId, catalogId, projectId);
  }

  public static void getCompletionConfig(String locationId, String catalogId, String projectId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name = CompletionConfigName.of(projectId, locationId, catalogId).toString();

      GetCompletionConfigRequest request =
          GetCompletionConfigRequest.newBuilder().setName(name).build();

      try {
        CompletionConfig response = client.getCompletionConfig(request);
        System.out.println("Completion config name: " + response.getName());
      } catch (FailedPreconditionException e) {
        System.out.println("Completion config name: " + name);
      }
    }
  }
}
// [END retail_v2_catalogservice_completionconfig_get]
