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

// [START clouderrorreporting_v1beta1_errorstatsservice_groupstats_list]
import com.google.devtools.clouderrorreporting.v1beta1.ErrorGroupStats;
import com.google.devtools.clouderrorreporting.v1beta1.ErrorStatsServiceClient;
import com.google.devtools.clouderrorreporting.v1beta1.ListGroupStatsRequest;
import com.google.devtools.clouderrorreporting.v1beta1.ProjectName;
import java.io.IOException;

public class ListGroupStats {

  public static void main(String[] args) throws IOException {
    // Provide the Google Cloud project ID.
    String projectId = "example-project-id";
    listGroupStats(projectId);
  }

  public static void listGroupStats(String projectId) throws IOException {
    try (ErrorStatsServiceClient client = ErrorStatsServiceClient.create()) {
      String projectName = ProjectName.of(projectId).toString();

      ListGroupStatsRequest request =
          ListGroupStatsRequest.newBuilder()
              .setProjectName(projectName)
              .build();

      for (ErrorGroupStats groupStats : client.listGroupStats(request).iterateAll()) {
        System.out.printf("Group ID: %s%n", groupStats.getGroup().getGroupId());
        System.out.printf("Count: %d%n", groupStats.getCount());
      }
    }
  }
}
// [END clouderrorreporting_v1beta1_errorstatsservice_groupstats_list]
