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

// [START pubsub_v1_schemaservice_schemarevision_delete]
import com.google.cloud.pubsub.v1.SchemaServiceClient;
import com.google.pubsub.v1.DeleteSchemaRevisionRequest;
import com.google.pubsub.v1.Schema;
import java.io.IOException;

public class DeleteSchemaRevision {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String schemaId = "example-schema_id";
    String revisionId = "example-revision_id";
    deleteSchemaRevision(projectId, schemaId, revisionId);
  }

  public static void deleteSchemaRevision(String projectId, String schemaId, String revisionId)
      throws Exception {
    try (SchemaServiceClient client = SchemaServiceClient.create()) {
      String name = String.format("projects/%s/schemas/%s@%s", projectId, schemaId, revisionId);
      DeleteSchemaRevisionRequest request =
          DeleteSchemaRevisionRequest.newBuilder().setName(name).build();

      Schema response = client.deleteSchemaRevision(request);
      System.out.println("Deleted schema revision: " + response.getName());
    }
  }
}
// [END pubsub_v1_schemaservice_schemarevision_delete]
