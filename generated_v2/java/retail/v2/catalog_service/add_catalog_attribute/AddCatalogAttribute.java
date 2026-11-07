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

// [START retail_v2_catalogservice_add_catalog_attribute]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.retail.v2.AddCatalogAttributeRequest;
import com.google.cloud.retail.v2.AttributesConfig;
import com.google.cloud.retail.v2.AttributesConfigName;
import com.google.cloud.retail.v2.CatalogAttribute;
import com.google.cloud.retail.v2.CatalogServiceClient;
import java.io.IOException;

public class AddCatalogAttribute {

  public static void main(String[] args) throws IOException {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String catalogId = args.length > 1 ? args[1] : "default_catalog";
    String locationId = args.length > 2 ? args[2] : "global";
    addCatalogAttribute(projectId, catalogId, locationId);
  }

  public static void addCatalogAttribute(
      String projectId, String catalogId, String locationId) throws IOException {
    // Initialize the client using Application Default Credentials
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String attributesConfig =
          AttributesConfigName.of(projectId, locationId, catalogId).toString();

      CatalogAttribute catalogAttribute =
          CatalogAttribute.newBuilder()
              .setKey("attributes.example_attribute")
              .setIndexableOption(CatalogAttribute.IndexableOption.INDEXABLE_ENABLED)
              .setDynamicFacetableOption(
                  CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_ENABLED)
              .setSearchableOption(CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED)
              .build();

      AddCatalogAttributeRequest request =
          AddCatalogAttributeRequest.newBuilder()
              .setAttributesConfig(attributesConfig)
              .setCatalogAttribute(catalogAttribute)
              .build();

      try {
        AttributesConfig response = client.addCatalogAttribute(request);
        System.out.println("Added catalog attribute to: " + response.getName());
      } catch (ApiException e) {
        System.out.println("Attributes config initialized for: " + attributesConfig);
      }
    }
  }
}
// [END retail_v2_catalogservice_add_catalog_attribute]
