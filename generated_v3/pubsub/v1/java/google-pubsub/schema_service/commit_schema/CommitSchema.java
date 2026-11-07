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

// [START pubsub_v1_schemaservice_commit_schema]
import com.google.cloud.pubsub.v1.SchemaServiceClient;
import com.google.pubsub.v1.CommitSchemaRequest;
import com.google.pubsub.v1.Schema;
import com.google.pubsub.v1.SchemaName;

public class CommitSchema {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String schemaId = "example-schema-id";
    commitSchema(projectId, schemaId);
  }

  public static void commitSchema(String projectId, String schemaId) throws Exception {
    try (SchemaServiceClient client = SchemaServiceClient.create()) {
      String name = SchemaName.of(projectId, schemaId).toString();
      Schema schema =
          Schema.newBuilder()
              .setName(name)
              .setType(Schema.Type.AVRO)
              .setDefinition(
                  "{\n"
                      + "  \"type\": \"record\",\n"
                      + "  \"name\": \"Avro\",\n"
                      + "  \"fields\": [\n"
                      + "    {\n"
                      + "      \"name\": \"StringField\",\n"
                      + "      \"type\": \"string\"\n"
                      + "    }\n"
                      + "  ]\n"
                      + "}")
              .build();

      CommitSchemaRequest request =
          CommitSchemaRequest.newBuilder()
              .setName(name)
              .setSchema(schema)
              .build();

      Schema response = client.commitSchema(request);
      System.out.println("Committed schema revision: " + response.getName());
      System.out.println("Revision ID: " + response.getRevisionId());
    }
  }
}
// [END pubsub_v1_schemaservice_commit_schema]
