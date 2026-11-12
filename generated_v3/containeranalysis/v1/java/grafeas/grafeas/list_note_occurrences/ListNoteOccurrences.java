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

// [START containeranalysis_v1_grafeas_noteoccurrences_list]
import io.grafeas.v1.GrafeasClient;
import io.grafeas.v1.Occurrence;
import java.io.IOException;

public class ListNoteOccurrences {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String noteId = "example-note-id";
    listNoteOccurrences(projectId, noteId);
  }

  public static void listNoteOccurrences(String projectId, String noteId) throws IOException {
    try (GrafeasClient client = GrafeasClient.create()) {
      String name = String.format("projects/%s/notes/%s", projectId, noteId);
      // Retrieve and print each occurrence associated with the specified note.
      for (Occurrence occurrence : client.listNoteOccurrences(name, "").iterateAll()) {
        System.out.println("Occurrence: " + occurrence.getName());
      }
    }
  }
}
// [END containeranalysis_v1_grafeas_noteoccurrences_list]
