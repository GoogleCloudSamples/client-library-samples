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

// [START workloadmanager_v1_workloadmanager_evaluation_get]
import com.google.cloud.workloadmanager.v1.Evaluation;
import com.google.cloud.workloadmanager.v1.EvaluationName;
import com.google.cloud.workloadmanager.v1.WorkloadManagerClient;

public class GetEvaluation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String evaluationId = "example-evaluation_id";
    getEvaluation(projectId, locationId, evaluationId);
  }

  public static void getEvaluation(String projectId, String locationId, String evaluationId)
      throws Exception {
    try (WorkloadManagerClient client = WorkloadManagerClient.create()) {
      String name = EvaluationName.of(projectId, locationId, evaluationId).toString();
      Evaluation response = client.getEvaluation(name);
      System.out.println("Evaluation retrieved: " + response.getName());
    }
  }
}
// [END workloadmanager_v1_workloadmanager_evaluation_get]
