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

// [START retail_v2_catalogservice_catalogs_list]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2.Catalog;
import com.google.cloud.retail.v2.CatalogServiceClient;
import com.google.cloud.retail.v2.ListCatalogsRequest;
import java.io.IOException;

public class ListCatalogs {

  public static void main(String[] args) throws IOException {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    String locationId = "global";

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }

    listCatalogs(projectId, locationId);
  }

  public static void listCatalogs(String projectId, String locationId) throws IOException {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListCatalogsRequest request = ListCatalogsRequest.newBuilder()
          .setParent(parent)
          .build();

      try {
        for (Catalog catalog : client.listCatalogs(request).iterateAll()) {
          System.out.println("Catalog: " + catalog.getName());
          System.out.println("Display name: " + catalog.getDisplayName());
        }
      } catch (FailedPreconditionException e) {
        System.out.println("Cloud Retail service terms have not been accepted for this project.");
      }
    }
  }
}
// [END retail_v2_catalogservice_catalogs_list]
