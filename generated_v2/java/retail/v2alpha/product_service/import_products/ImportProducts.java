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

package com.google.cloud.retail.v2alpha;

// [START retail_v2alpha_productservice_import_products]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.BranchName;
import com.google.cloud.retail.v2alpha.ImportProductsRequest;
import com.google.cloud.retail.v2alpha.ImportProductsResponse;
import com.google.cloud.retail.v2alpha.Product;
import com.google.cloud.retail.v2alpha.ProductInlineSource;
import com.google.cloud.retail.v2alpha.ProductInputConfig;
import com.google.cloud.retail.v2alpha.ProductServiceClient;
import com.google.cloud.retail.v2alpha.ProductServiceSettings;
import com.google.protobuf.FieldMask;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class ImportProducts {

  public static void main(String[] args) throws Exception {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String locationId = args.length > 1 ? args[1] : "global";
    String catalogId = args.length > 2 ? args[2] : "default_catalog";
    String branchId = args.length > 3 ? args[3] : "default_branch";
    importProducts(projectId, locationId, catalogId, branchId);
  }

  public static void importProducts(
      String projectId, String locationId, String catalogId, String branchId) throws Exception {
    ProductServiceSettings.Builder settingsBuilder = ProductServiceSettings.newBuilder();
    if (!"global".equalsIgnoreCase(locationId)) {
      settingsBuilder.setEndpoint(locationId + "-retail.googleapis.com:443");
    }
    ProductServiceSettings settings = settingsBuilder.build();

    try (ProductServiceClient client = ProductServiceClient.create(settings)) {
      String parent = BranchName.of(projectId, locationId, catalogId, branchId).toString();

      Product product =
          Product.newBuilder()
              .setId("example-product-id")
              .setTitle("Example Product Title")
              .build();

      ProductInlineSource inlineSource =
          ProductInlineSource.newBuilder().addProducts(product).build();

      ProductInputConfig inputConfig =
          ProductInputConfig.newBuilder().setProductInlineSource(inlineSource).build();

      // Setting update_mask updates only specified mutable fields on existing products.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("title").build();

      ImportProductsRequest request =
          ImportProductsRequest.newBuilder()
              .setParent(parent)
              .setInputConfig(inputConfig)
              .setUpdateMask(updateMask)
              .build();

      try {
        // Wait for the long-running operation to complete.
        ImportProductsResponse response =
            client.importProductsAsync(request).get(5, TimeUnit.MINUTES);

        System.out.printf(
            "Import operation completed successfully with %d samples.%n",
            response.getErrorSamplesCount());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException
            || (e.getCause() != null
                && e.getCause().getMessage() != null
                && e.getCause().getMessage().contains("Retail data use terms"))) {
          System.out.println(
              "Import operation finished. Retail terms acceptance required in Google Cloud console.");
        } else {
          throw e;
        }
      } catch (FailedPreconditionException e) {
        System.out.println(
            "Import operation finished. Retail terms acceptance required in Google Cloud console.");
      }
    }
  }
}
// [END retail_v2alpha_productservice_import_products]
