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

// [START retail_v2alpha_catalogservice_catalogs_list]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.Catalog;
import com.google.cloud.retail.v2alpha.CatalogServiceClient;
import com.google.cloud.retail.v2alpha.ListCatalogsRequest;
import java.io.IOException;

public class ListCatalogs {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    listCatalogs(projectId, locationId);
  }

  public static void listCatalogs(String projectId, String locationId) throws IOException {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListCatalogsRequest request = ListCatalogsRequest.newBuilder().setParent(parent).build();

      for (Catalog catalog : client.listCatalogs(request).iterateAll()) {
        System.out.println("Catalog Name: " + catalog.getName());
        System.out.println("Display Name: " + catalog.getDisplayName());
      }
    } catch (FailedPreconditionException e) {
      System.out.println(
          "Cloud Retail service terms must be accepted in the Google Cloud console before listing"
              + " catalogs.");
    }
  }
}
// [END retail_v2alpha_catalogservice_catalogs_list]
