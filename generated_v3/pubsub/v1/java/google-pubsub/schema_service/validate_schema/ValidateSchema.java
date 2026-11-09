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

package com.google.cloud.pubsub.v1;

// [START pubsub_v1_schemaservice_validate_schema]
import com.google.cloud.pubsub.v1.SchemaServiceClient;
import com.google.pubsub.v1.Schema;
import com.google.pubsub.v1.ValidateSchemaResponse;

public class ValidateSchema {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String schemaId = "example-schema_id";
    validateSchema(projectId, schemaId);
  }

  public static void validateSchema(String projectId, String schemaId) throws Exception {
    try (SchemaServiceClient client = SchemaServiceClient.create()) {
      String parent = "projects/" + projectId;
      Schema schema =
          Schema.newBuilder()
              .setName(String.format("projects/%s/schemas/%s", projectId, schemaId))
              .setType(Schema.Type.AVRO)
              .setDefinition(
                  "{\"type\":\"record\",\"name\":\"Root\",\"fields\":[{\"name\":\"message\",\"type\":\"string\"}]}")
              .build();

      ValidateSchemaResponse response = client.validateSchema(parent, schema);
      System.out.println("Validated schema: " + schema.getName());
    }
  }
}
// [END pubsub_v1_schemaservice_validate_schema]
