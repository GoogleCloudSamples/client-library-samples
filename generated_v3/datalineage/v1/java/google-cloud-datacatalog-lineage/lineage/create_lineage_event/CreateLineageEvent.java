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

package com.google.cloud.datalineage.v1;

// [START datalineage_v1_lineage_lineageevent_create]
import com.google.cloud.datacatalog.lineage.v1.EntityReference;
import com.google.cloud.datacatalog.lineage.v1.EventLink;
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.LineageEvent;
import com.google.cloud.datacatalog.lineage.v1.RunName;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.time.Instant;

public class CreateLineageEvent {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    String runId = "example-run-id";
    createLineageEvent(projectId, locationId, processId, runId);
  }

  public static void createLineageEvent(
      String projectId, String locationId, String processId, String runId) throws IOException {
    // Initialize client that will be closed when the block finishes
    try (LineageClient client = LineageClient.create()) {
      String parent = RunName.of(projectId, locationId, processId, runId).toString();

      Instant now = Instant.now();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      EntityReference source =
          EntityReference.newBuilder()
              .setFullyQualifiedName("bigquery:example-project.example_dataset.source_table")
              .build();

      EntityReference target =
          EntityReference.newBuilder()
              .setFullyQualifiedName("bigquery:example-project.example_dataset.target_table")
              .build();

      EventLink link =
          EventLink.newBuilder()
              .setSource(source)
              .setTarget(target)
              .build();

      LineageEvent lineageEvent =
          LineageEvent.newBuilder()
              .setStartTime(startTime)
              .addLinks(link)
              .build();

      LineageEvent response = client.createLineageEvent(parent, lineageEvent);
      System.out.println("Created lineage event: " + response.getName());
    }
  }
}
// [END datalineage_v1_lineage_lineageevent_create]
