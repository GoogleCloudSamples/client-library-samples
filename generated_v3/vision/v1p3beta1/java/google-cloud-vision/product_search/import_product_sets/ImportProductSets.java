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

package com.google.cloud.vision.v1p3beta1;

// [START vision_v1p3beta1_productsearch_import_product_sets]
import com.google.cloud.vision.v1p3beta1.ImportProductSetsGcsSource;
import com.google.cloud.vision.v1p3beta1.ImportProductSetsInputConfig;
import com.google.cloud.vision.v1p3beta1.ImportProductSetsResponse;
import com.google.cloud.vision.v1p3beta1.ProductSearchClient;
import com.google.cloud.vision.v1p3beta1.ReferenceImage;
import java.util.concurrent.TimeUnit;

public class ImportProductSets {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locId = "us-west1";
    importProductSets(projectId, locId);
  }

  public static void importProductSets(String projectId, String locId) throws Exception {
    // Product Search is supported in us-west1, us-east1, asia-east1, and europe-west1.
    if (!"us-west1".equals(locId)
        && !"us-east1".equals(locId)
        && !"asia-east1".equals(locId)
        && !"europe-west1".equals(locId)) {
      locId = "us-west1";
    }

    try (ProductSearchClient client = ProductSearchClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locId);
      ImportProductSetsGcsSource gcsSource =
          ImportProductSetsGcsSource.newBuilder()
              .setCsvFileUri("gs://cloud-samples-data/vision/product_search/product_sets.csv")
              .build();
      ImportProductSetsInputConfig inputConfig =
          ImportProductSetsInputConfig.newBuilder().setGcsSource(gcsSource).build();

      ImportProductSetsResponse response =
          client.importProductSetsAsync(parent, inputConfig).get(300, TimeUnit.SECONDS);

      System.out.printf(
          "Import completed with %d reference images.%n", response.getReferenceImagesCount());
      for (ReferenceImage image : response.getReferenceImagesList()) {
        System.out.printf("Imported reference image: %s%n", image.getName());
      }
    }
  }
}
// [END vision_v1p3beta1_productsearch_import_product_sets]
