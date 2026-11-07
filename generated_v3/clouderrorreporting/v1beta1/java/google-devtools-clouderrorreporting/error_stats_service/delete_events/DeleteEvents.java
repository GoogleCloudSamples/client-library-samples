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

package com.google.cloud.clouderrorreporting.v1beta1;

// [START clouderrorreporting_v1beta1_errorstatsservice_events_delete]
import com.google.devtools.clouderrorreporting.v1beta1.DeleteEventsResponse;
import com.google.devtools.clouderrorreporting.v1beta1.ErrorStatsServiceClient;
import com.google.devtools.clouderrorreporting.v1beta1.ProjectName;

public class DeleteEvents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    deleteEvents(projectId);
  }

  public static void deleteEvents(String projectId) throws Exception {
    try (ErrorStatsServiceClient client = ErrorStatsServiceClient.create()) {
      String projectName = ProjectName.of(projectId).toString();
      DeleteEventsResponse response = client.deleteEvents(projectName);
      System.out.println("Deleted events for project " + projectName + ": " + response);
    }
  }
}
// [END clouderrorreporting_v1beta1_errorstatsservice_events_delete]
