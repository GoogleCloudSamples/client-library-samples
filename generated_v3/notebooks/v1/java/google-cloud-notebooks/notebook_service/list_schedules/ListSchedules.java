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

// [START notebooks_v1_notebookservice_schedules_list]
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import com.google.cloud.notebooks.v1.Schedule;

public class ListSchedules {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listSchedules(projectId, locationId);
  }

  public static void listSchedules(String projectId, String locationId) throws Exception {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Schedule schedule : client.listSchedules(parent).iterateAll()) {
        System.out.println("Schedule: " + schedule.getName());
      }
    }
  }
}
// [END notebooks_v1_notebookservice_schedules_list]
