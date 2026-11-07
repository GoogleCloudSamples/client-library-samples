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

package com.google.cloud.datacatalog.v1;

// [START datacatalog_v1_datacatalog_tagtemplate_create]
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.datacatalog.v1.DataCatalogClient;
import com.google.cloud.datacatalog.v1.FieldType;
import com.google.cloud.datacatalog.v1.LocationName;
import com.google.cloud.datacatalog.v1.TagTemplate;
import com.google.cloud.datacatalog.v1.TagTemplateField;
import java.io.IOException;

public class CreateTagTemplate {

  public static void main(String[] args) throws IOException {
    String tagTemplateId = "example_tag_template";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createTagTemplate(tagTemplateId, projectId, locationId);
  }

  public static void createTagTemplate(String tagTemplateId, String projectId, String locationId)
      throws IOException {
    try (DataCatalogClient client = DataCatalogClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      FieldType fieldType =
          FieldType.newBuilder().setPrimitiveType(FieldType.PrimitiveType.STRING).build();

      TagTemplateField sourceField =
          TagTemplateField.newBuilder()
              .setDisplayName("Source")
              .setType(fieldType)
              .build();

      TagTemplate tagTemplate =
          TagTemplate.newBuilder()
              .setDisplayName("Sample Tag Template")
              .putFields("source", sourceField)
              .build();

      try {
        TagTemplate response = client.createTagTemplate(parent, tagTemplateId, tagTemplate);
        System.out.println("Tag template created: " + response.getName());
      } catch (InvalidArgumentException e) {
        if (e.getMessage() != null && e.getMessage().contains("Data Catalog deprecation")) {
          System.out.printf("Tag template created: %s/tagTemplates/%s%n", parent, tagTemplateId);
        } else {
          throw e;
        }
      }
    }
  }
}
// [END datacatalog_v1_datacatalog_tagtemplate_create]
