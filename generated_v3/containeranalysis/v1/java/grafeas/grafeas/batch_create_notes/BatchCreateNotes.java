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

// [START containeranalysis_v1_grafeas_notes_batchcreate]
import io.grafeas.v1.AttestationNote;
import io.grafeas.v1.BatchCreateNotesResponse;
import io.grafeas.v1.GrafeasClient;
import io.grafeas.v1.Note;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class BatchCreateNotes {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String noteId = "example-note-id";
    batchCreateNotes(projectId, noteId);
  }

  public static void batchCreateNotes(String projectId, String noteId) throws IOException {
    try (GrafeasClient client = GrafeasClient.create()) {
      String parent = String.format("projects/%s", projectId);

      AttestationNote attestationNote =
          AttestationNote.newBuilder()
              .setHint(
                  AttestationNote.Hint.newBuilder()
                      .setHumanReadableName("Attestation Authority")
                      .build())
              .build();

      Note note =
          Note.newBuilder()
              .setShortDescription("Attestation note")
              .setAttestation(attestationNote)
              .build();

      Map<String, Note> notes = new HashMap<>();
      notes.put(noteId, note);

      BatchCreateNotesResponse response = client.batchCreateNotes(parent, notes);

      System.out.println("Batch created notes: " + response.getNotesCount());
      for (Note createdNote : response.getNotesList()) {
        System.out.println("Created note: " + createdNote.getName());
      }
    }
  }
}
// [END containeranalysis_v1_grafeas_notes_batchcreate]
