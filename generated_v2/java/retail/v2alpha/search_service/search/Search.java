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

// [START retail_v2alpha_searchservice_search]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.SearchRequest;
import com.google.cloud.retail.v2alpha.SearchResponse;
import com.google.cloud.retail.v2alpha.SearchServiceClient;
import java.io.IOException;

public class Search {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String visitorId = "example-visitor-id";
    search(projectId, visitorId);
  }

  public static void search(String projectId, String visitorId) throws IOException {
    try (SearchServiceClient client = SearchServiceClient.create()) {
      String placement =
          String.format(
              "projects/%s/locations/global/catalogs/default_catalog/servingConfigs/default_serving_config",
              projectId);

      SearchRequest request =
          SearchRequest.newBuilder()
              .setPlacement(placement)
              .setVisitorId(visitorId)
              .setQuery("apparel")
              .setPageSize(10)
              .build();

      for (SearchResponse.SearchResult result : client.search(request).iterateAll()) {
        System.out.printf("Product ID: %s%n", result.getId());
      }
    } catch (FailedPreconditionException e) {
      System.out.println(
          "Retail search requires terms acceptance in the Google Cloud console.");
    }
  }
}
// [END retail_v2alpha_searchservice_search]
