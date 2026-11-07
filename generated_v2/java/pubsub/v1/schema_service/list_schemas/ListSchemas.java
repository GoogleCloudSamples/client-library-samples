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

// [START pubsub_v1_schemaservice_schemas_list]
import com.google.cloud.pubsub.v1.SchemaServiceClient;
import com.google.pubsub.v1.ProjectName;
import com.google.pubsub.v1.Schema;
import java.io.IOException;

public class ListSchemas {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    listSchemas(projectId);
  }

  public static void listSchemas(String projectId) throws Exception {
    try (SchemaServiceClient client = SchemaServiceClient.create()) {
      String parent = ProjectName.of(projectId).toString();
      for (Schema schema : client.listSchemas(parent).iterateAll()) {
        System.out.println("Found schema: " + schema.getName());
      }
    }
  }
}
// [END pubsub_v1_schemaservice_schemas_list]
