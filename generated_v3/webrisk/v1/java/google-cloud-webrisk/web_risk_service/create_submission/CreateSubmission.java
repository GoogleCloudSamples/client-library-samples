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

package com.google.cloud.webrisk.v1;

// [START webrisk_v1_webriskservice_submission_create]
import com.google.cloud.webrisk.v1.WebRiskServiceClient;
import com.google.webrisk.v1.Submission;

public class CreateSubmission {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    createSubmission(projectId);
  }

  public static void createSubmission(String projectId) throws Exception {
    try (WebRiskServiceClient client = WebRiskServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      Submission submission =
          Submission.newBuilder()
              .setUri("http://testsafebrowsing.appspot.com/s/phishing.html")
              .build();

      Submission response = client.createSubmission(parent, submission);
      System.out.println("Created submission for URI: " + response.getUri());
    }
  }
}
// [END webrisk_v1_webriskservice_submission_create]
