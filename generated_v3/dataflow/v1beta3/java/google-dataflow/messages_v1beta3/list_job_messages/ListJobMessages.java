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

package com.google.cloud.dataflow.v1beta3;

// [START dataflow_v1beta3_messagesv1beta3_jobmessages_list]
import com.google.dataflow.v1beta3.JobMessage;
import com.google.dataflow.v1beta3.ListJobMessagesRequest;
import com.google.dataflow.v1beta3.MessagesV1Beta3Client;
import java.io.IOException;

public class ListJobMessages {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String jobId = "example-job-id";
    listJobMessages(projectId, locationId, jobId);
  }

  public static void listJobMessages(String projectId, String locationId, String jobId)
      throws IOException {
    // Initializes client using Application Default Credentials for authentication.
    try (MessagesV1Beta3Client client = MessagesV1Beta3Client.create()) {
      ListJobMessagesRequest request =
          ListJobMessagesRequest.newBuilder()
              .setProjectId(projectId)
              .setLocation(locationId)
              .setJobId(jobId)
              .build();

      for (JobMessage message : client.listJobMessages(request).iterateAll()) {
        System.out.printf("Message ID: %s%n", message.getId());
        System.out.printf("Importance: %s%n", message.getMessageImportance());
        System.out.printf("Text: %s%n", message.getMessageText());
      }
    }
  }
}
// [END dataflow_v1beta3_messagesv1beta3_jobmessages_list]
