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

package com.google.cloud.binaryauthorization.v1;

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_update]
import com.google.protos.google.cloud.binaryauthorization.v1.AttestorName;
import com.google.protos.google.cloud.binaryauthorization.v1.BinauthzManagementServiceV1Client;
import com.google.protos.google.cloud.binaryauthorization.v1.Resources.Attestor;
import java.io.IOException;

public class UpdateAttestor {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String attestorId = "example-attestor-id";
    updateAttestor(projectId, attestorId);
  }

  public static void updateAttestor(String projectId, String attestorId) throws IOException {
    try (BinauthzManagementServiceV1Client client = BinauthzManagementServiceV1Client.create()) {
      AttestorName attestorName = AttestorName.of(projectId, attestorId);

      // UpdateAttestor performs a full replacement. Retrieve the existing Attestor
      // to preserve required fields such as the Grafeas note configuration and etag.
      Attestor existingAttestor = client.getAttestor(attestorName);
      Attestor attestor =
          existingAttestor.toBuilder().setDescription("Updated description").build();

      Attestor response = client.updateAttestor(attestor);
      System.out.println("Attestor updated successfully: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_update]
