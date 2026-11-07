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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_dlpjobs_list]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.DlpJob;
import com.google.privacy.dlp.v2.ListDlpJobsRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ListDlpJobs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    listDlpJobs(projectId);
  }

  public static void listDlpJobs(String projectId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      ListDlpJobsRequest request =
          ListDlpJobsRequest.newBuilder()
              .setParent(parent)
              .build();

      // Iterate through all DLP jobs in the specified project
      for (DlpJob dlpJob : client.listDlpJobs(request).iterateAll()) {
        System.out.printf("Job name: %s%n", dlpJob.getName());
        System.out.printf("Job type: %s%n", dlpJob.getType());
        System.out.printf("Job state: %s%n", dlpJob.getState());
      }
    }
  }
}
// [END dlp_v2_dlpservice_dlpjobs_list]
