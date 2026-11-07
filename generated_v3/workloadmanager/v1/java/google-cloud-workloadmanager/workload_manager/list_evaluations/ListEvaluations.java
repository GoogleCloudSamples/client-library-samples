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

package com.google.cloud.workloadmanager.v1;

// [START workloadmanager_v1_workloadmanager_evaluations_list]
import com.google.cloud.workloadmanager.v1.Evaluation;
import com.google.cloud.workloadmanager.v1.WorkloadManagerClient;

public class ListEvaluations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listEvaluations(projectId, locationId);
  }

  public static void listEvaluations(String projectId, String locationId) throws Exception {
    // Initialize client that will be closed at the end of the try-with-resources block.
    try (WorkloadManagerClient client = WorkloadManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Evaluation evaluation : client.listEvaluations(parent).iterateAll()) {
        System.out.printf("Evaluation Name: %s%n", evaluation.getName());
        System.out.printf("Description: %s%n", evaluation.getDescription());
      }
    }
  }
}
// [END workloadmanager_v1_workloadmanager_evaluations_list]
