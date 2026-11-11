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

package com.google.cloud.notebooks.v1;

// [START notebooks_v1_notebookservice_schedule_create]
import com.google.cloud.notebooks.v1.ExecutionTemplate;
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import com.google.cloud.notebooks.v1.Schedule;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateSchedule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String scheduleId = "example-schedule-id";
    createSchedule(projectId, locationId, scheduleId);
  }

  public static void createSchedule(String projectId, String locationId, String scheduleId)
      throws Exception {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ExecutionTemplate executionTemplate =
          ExecutionTemplate.newBuilder()
              .setScaleTier(ExecutionTemplate.ScaleTier.CUSTOM)
              .setMasterType("n1-standard-4")
              .setInputNotebookFile("gs://example-bucket/notebook.ipynb")
              .setOutputNotebookFolder("gs://example-bucket/output")
              .build();

      Schedule schedule =
          Schedule.newBuilder()
              .setCronSchedule("0 0 * * WED")
              .setExecutionTemplate(executionTemplate)
              .build();

      Schedule response = client.createScheduleAsync(parent, schedule, scheduleId).get();
      System.out.println("Created schedule: " + response.getName());
    }
  }
}
// [END notebooks_v1_notebookservice_schedule_create]
