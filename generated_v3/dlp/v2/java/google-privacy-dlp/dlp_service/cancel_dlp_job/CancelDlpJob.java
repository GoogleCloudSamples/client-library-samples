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

// [START dlp_v2_dlpservice_dlpjob_cancel]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CancelDlpJobRequest;
import java.io.IOException;

public class CancelDlpJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String dlpJobId = "example-dlp_job_id";
    cancelDlpJob(projectId, dlpJobId);
  }

  public static void cancelDlpJob(String projectId, String dlpJobId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String name = String.format("projects/%s/dlpJobs/%s", projectId, dlpJobId);

      CancelDlpJobRequest request = CancelDlpJobRequest.newBuilder().setName(name).build();
      client.cancelDlpJob(request);
      System.out.printf("Canceled DLP job: %s%n", name);
    }
  }
}
// [END dlp_v2_dlpservice_dlpjob_cancel]
