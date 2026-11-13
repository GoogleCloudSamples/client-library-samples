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

package com.google.cloud.binaryauthorization.v1beta1;

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_create]
import com.google.cloud.binaryauthorization.v1beta1.Attestor;
import com.google.cloud.binaryauthorization.v1beta1.BinauthzManagementServiceV1Beta1Client;
import com.google.cloud.binaryauthorization.v1beta1.UserOwnedDrydockNote;
import java.io.IOException;

public class CreateAttestor {

  public static void main(String[] args) throws Exception {
    String attestorId = "example-attestor_id";
    String projectId = "example-project_id";
    createAttestor(attestorId, projectId);
  }

  public static void createAttestor(String attestorId, String projectId) throws Exception {
    try (BinauthzManagementServiceV1Beta1Client client =
        BinauthzManagementServiceV1Beta1Client.create()) {
      String parent = String.format("projects/%s", projectId);
      String noteReference = String.format("projects/%s/notes/example-note", projectId);

      UserOwnedDrydockNote drydockNote =
          UserOwnedDrydockNote.newBuilder()
              .setNoteReference(noteReference)
              .build();

      Attestor attestor =
          Attestor.newBuilder()
              .setName(String.format("projects/%s/attestors/%s", projectId, attestorId))
              .setDescription("Attestor for container image verification")
              .setUserOwnedDrydockNote(drydockNote)
              .build();

      Attestor response = client.createAttestor(parent, attestorId, attestor);
      System.out.println("Created attestor: " + response.getName());
    }
  }
}
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_create]
