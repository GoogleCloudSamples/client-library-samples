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

package com.google.cloud.containeranalysis.v1;

// [START containeranalysis_v1_grafeas_occurrence_get]
import io.grafeas.v1.GrafeasClient;
import io.grafeas.v1.Occurrence;
import java.io.IOException;

public class GetOccurrence {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String occurrenceId = "example-occurrence-id";
    getOccurrence(projectId, occurrenceId);
  }

  public static void getOccurrence(String projectId, String occurrenceId) throws IOException {
    try (GrafeasClient client = GrafeasClient.create()) {
      String name = String.format("projects/%s/occurrences/%s", projectId, occurrenceId);
      Occurrence occurrence = client.getOccurrence(name);
      System.out.println("Occurrence name: " + occurrence.getName());
    }
  }
}
// [END containeranalysis_v1_grafeas_occurrence_get]
