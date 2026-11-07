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

package com.google.cloud.vision.v1;

// [START vision_v1_productsearch_import_product_sets]
import com.google.cloud.vision.v1.ImportProductSetsGcsSource;
import com.google.cloud.vision.v1.ImportProductSetsInputConfig;
import com.google.cloud.vision.v1.ImportProductSetsResponse;
import com.google.cloud.vision.v1.LocationName;
import com.google.cloud.vision.v1.ProductSearchClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ImportProductSets {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "us-east1";
    importProductSets(projectId, locationId);
  }

  public static void importProductSets(String projectId, String locationId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // Product Search is supported in us-west1, us-east1, asia-east1, and europe-west1.
    if (!"us-west1".equals(locationId)
        && !"us-east1".equals(locationId)
        && !"asia-east1".equals(locationId)
        && !"europe-west1".equals(locationId)) {
      locationId = "us-east1";
    }

    try (ProductSearchClient client = ProductSearchClient.create()) {
      ImportProductSetsInputConfig inputConfig =
          ImportProductSetsInputConfig.newBuilder()
              .setGcsSource(
                  ImportProductSetsGcsSource.newBuilder()
                      .setCsvFileUri("gs://cloud-samples-data/vision/product_search/product_sets.csv")
                      .build())
              .build();
      String parent = LocationName.of(projectId, locationId).toString();

      // Initiate the long-running operation and wait for completion.
      ImportProductSetsResponse response =
          client.importProductSetsAsync(parent, inputConfig).get(180, TimeUnit.SECONDS);

      System.out.printf("Reference images imported: %d%n", response.getReferenceImagesCount());
    }
  }
}
// [END vision_v1_productsearch_import_product_sets]
