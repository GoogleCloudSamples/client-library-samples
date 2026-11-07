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

// [START notebooks_v1_notebookservice_schedule_get]
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import com.google.cloud.notebooks.v1.Schedule;
import java.io.IOException;

public class GetSchedule {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String scheduleId = "example-schedule-id";
    getSchedule(projectId, locationId, scheduleId);
  }

  public static void getSchedule(String projectId, String locationId, String scheduleId)
      throws IOException {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/schedules/%s", projectId, locationId, scheduleId);
      Schedule schedule = client.getSchedule(name);
      System.out.println("Schedule name: " + schedule.getName());
      System.out.println("State: " + schedule.getState());
      System.out.println("Cron schedule: " + schedule.getCronSchedule());
    }
  }
}
// [END notebooks_v1_notebookservice_schedule_get]
