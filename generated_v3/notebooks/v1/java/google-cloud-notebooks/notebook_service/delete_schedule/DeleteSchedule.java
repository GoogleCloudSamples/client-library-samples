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

// [START notebooks_v1_notebookservice_schedule_delete]
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import java.util.concurrent.TimeUnit;

public class DeleteSchedule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String scheduleId = "example-schedule-id";
    deleteSchedule(projectId, locationId, scheduleId);
  }

  public static void deleteSchedule(String projectId, String locationId, String scheduleId)
      throws Exception {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/schedules/%s", projectId, locationId, scheduleId);

      // Delete the schedule and wait for the long-running operation to complete.
      client.deleteScheduleAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted schedule: " + name);
    }
  }
}
// [END notebooks_v1_notebookservice_schedule_delete]
