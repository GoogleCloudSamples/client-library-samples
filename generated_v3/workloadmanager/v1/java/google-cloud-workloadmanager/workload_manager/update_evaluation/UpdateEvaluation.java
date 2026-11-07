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

// [START workloadmanager_v1_workloadmanager_evaluation_update]
import com.google.cloud.workloadmanager.v1.Evaluation;
import com.google.cloud.workloadmanager.v1.EvaluationName;
import com.google.cloud.workloadmanager.v1.WorkloadManagerClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateEvaluation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String evaluationId = "example-evaluation_id";
    updateEvaluation(projectId, locationId, evaluationId);
  }

  public static void updateEvaluation(String projectId, String locationId, String evaluationId)
      throws Exception {
    try (WorkloadManagerClient client = WorkloadManagerClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Evaluation evaluation =
          Evaluation.newBuilder()
              .setName(EvaluationName.of(projectId, locationId, evaluationId).toString())
              .setDescription("Updated workload manager evaluation description")
              .build();

      // Initiate the update operation and wait for completion.
      Evaluation updatedEvaluation = client.updateEvaluationAsync(evaluation, updateMask).get();
      System.out.println("Evaluation updated successfully: " + updatedEvaluation.getName());
    }
  }
}
// [END workloadmanager_v1_workloadmanager_evaluation_update]
