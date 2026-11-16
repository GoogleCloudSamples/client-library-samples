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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
import com.google.cloud.binaryauthorization.v1beta1.AttestorName;
import com.google.cloud.binaryauthorization.v1beta1.BinauthzManagementServiceV1Beta1Client;

public class DeleteAttestor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String attestorId = "example-attestor-id";
    deleteAttestor(projectId, attestorId);
  }

  public static void deleteAttestor(String projectId, String attestorId) throws Exception {
    // Initialize the client in a try-with-resources statement to ensure automatic cleanup.
    try (BinauthzManagementServiceV1Beta1Client client =
        BinauthzManagementServiceV1Beta1Client.create()) {
      String name = AttestorName.of(projectId, attestorId).toString();
      client.deleteAttestor(name);
      System.out.println("Deleted attestor: " + name);
    }
  }
}
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
