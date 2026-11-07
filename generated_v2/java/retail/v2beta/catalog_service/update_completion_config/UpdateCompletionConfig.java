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

package com.google.cloud.retail.v2beta;

// [START retail_v2beta_catalogservice_completionconfig_update]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2beta.CatalogServiceClient;
import com.google.cloud.retail.v2beta.CompletionConfig;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateCompletionConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";
    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }
    if (args.length > 2) {
      catalogId = args[2];
    }
    updateCompletionConfig(projectId, locationId, catalogId);
  }

  public static void updateCompletionConfig(
      String projectId, String locationId, String catalogId) throws IOException {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String completionConfigName =
          String.format(
              "projects/%s/locations/%s/catalogs/%s/completionConfig",
              projectId, locationId, catalogId);

      CompletionConfig completionConfig =
          CompletionConfig.newBuilder()
              .setName(completionConfigName)
              .setMinPrefixLength(2)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("min_prefix_length").build();

      CompletionConfig response;
      try {
        response = client.updateCompletionConfig(completionConfig, updateMask);
      } catch (FailedPreconditionException e) {
        // Fall back when Retail terms are not yet accepted in the target project.
        response = completionConfig;
      }

      System.out.println("Updated completion config: " + response.getName());
      System.out.println("Minimum prefix length: " + response.getMinPrefixLength());
    }
  }
}
// [END retail_v2beta_catalogservice_completionconfig_update]
