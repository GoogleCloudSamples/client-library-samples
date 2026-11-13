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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
import com.google.cloud.binaryauthorization.v1beta1.Attestor;
import com.google.cloud.binaryauthorization.v1beta1.BinauthzManagementServiceV1Beta1Client;

public class ListAttestors {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    listAttestors(projectId);
  }

  public static void listAttestors(String projectId) throws Exception {
    try (BinauthzManagementServiceV1Beta1Client client =
        BinauthzManagementServiceV1Beta1Client.create()) {
      String parent = "projects/" + projectId;

      for (Attestor attestor : client.listAttestors(parent).iterateAll()) {
        System.out.println("Attestor name: " + attestor.getName());
      }
    }
  }
}
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
