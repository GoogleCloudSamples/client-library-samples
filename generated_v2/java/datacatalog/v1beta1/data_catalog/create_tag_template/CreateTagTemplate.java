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

package com.google.cloud.datacatalog.v1beta1;

// [START datacatalog_v1beta1_datacatalog_tagtemplate_create]
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.datacatalog.v1beta1.DataCatalogClient;
import com.google.cloud.datacatalog.v1beta1.FieldType;
import com.google.cloud.datacatalog.v1beta1.LocationName;
import com.google.cloud.datacatalog.v1beta1.TagTemplate;
import com.google.cloud.datacatalog.v1beta1.TagTemplateField;
import java.io.IOException;

public class CreateTagTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String tagTemplateId = "example_tag_template_id";
    String locationId = "us-central1";
    createTagTemplate(projectId, tagTemplateId, locationId);
  }

  public static void createTagTemplate(
      String projectId, String tagTemplateId, String locationId) throws IOException {
    // Initialize client that will be closed when the try-with-resources block exits.
    try (DataCatalogClient client = DataCatalogClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      TagTemplateField sourceField =
          TagTemplateField.newBuilder()
              .setDisplayName("Source")
              .setType(
                  FieldType.newBuilder()
                      .setPrimitiveType(FieldType.PrimitiveType.STRING)
                      .build())
              .build();

      TagTemplate tagTemplate =
          TagTemplate.newBuilder()
              .setDisplayName("Sample Tag Template")
              .putFields("source", sourceField)
              .build();

      try {
        TagTemplate response = client.createTagTemplate(parent, tagTemplateId, tagTemplate);
        System.out.println("Created tag template: " + response.getName());
      } catch (InvalidArgumentException e) {
        if (e.getMessage().contains("deprecation")) {
          System.out.println("Data Catalog write operations are disabled due to deprecation.");
        } else {
          throw e;
        }
      }
    }
  }
}
// [END datacatalog_v1beta1_datacatalog_tagtemplate_create]
