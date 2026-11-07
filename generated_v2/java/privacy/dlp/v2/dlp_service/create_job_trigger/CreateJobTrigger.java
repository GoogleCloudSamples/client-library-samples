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

// [START dlp_v2_dlpservice_jobtrigger_create]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CloudStorageOptions;
import com.google.privacy.dlp.v2.CreateJobTriggerRequest;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.InspectJobConfig;
import com.google.privacy.dlp.v2.JobTrigger;
import com.google.privacy.dlp.v2.Schedule;
import com.google.privacy.dlp.v2.StorageConfig;
import com.google.protobuf.Duration;
import java.io.IOException;

public class CreateJobTrigger {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String triggerId = "example-trigger_id";
    createJobTrigger(projectId, triggerId);
  }

  public static void createJobTrigger(String projectId, String triggerId) throws IOException {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      // Define scan target in Cloud Storage
      CloudStorageOptions.FileSet fileSet =
          CloudStorageOptions.FileSet.newBuilder().setUrl("gs://example-bucket/*").build();
      CloudStorageOptions cloudStorageOptions =
          CloudStorageOptions.newBuilder().setFileSet(fileSet).build();
      StorageConfig storageConfig =
          StorageConfig.newBuilder().setCloudStorageOptions(cloudStorageOptions).build();

      // Specify info types to inspect
      InfoType personName = InfoType.newBuilder().setName("PERSON_NAME").build();
      InfoType emailAddress = InfoType.newBuilder().setName("EMAIL_ADDRESS").build();
      InspectConfig inspectConfig =
          InspectConfig.newBuilder()
              .addInfoTypes(personName)
              .addInfoTypes(emailAddress)
              .build();

      InspectJobConfig inspectJob =
          InspectJobConfig.newBuilder()
              .setStorageConfig(storageConfig)
              .setInspectConfig(inspectConfig)
              .build();

      // Configure a recurring schedule for once per day
      Duration recurrencePeriod = Duration.newBuilder().setSeconds(86400).build();
      Schedule schedule =
          Schedule.newBuilder().setRecurrencePeriodDuration(recurrencePeriod).build();
      JobTrigger.Trigger trigger = JobTrigger.Trigger.newBuilder().setSchedule(schedule).build();

      JobTrigger jobTrigger =
          JobTrigger.newBuilder()
              .setStatus(JobTrigger.Status.HEALTHY)
              .addTriggers(trigger)
              .setInspectJob(inspectJob)
              .build();

      CreateJobTriggerRequest request =
          CreateJobTriggerRequest.newBuilder()
              .setParent(parent)
              .setJobTrigger(jobTrigger)
              .setTriggerId(triggerId)
              .build();

      JobTrigger createdTrigger = client.createJobTrigger(request);
      System.out.println("Created job trigger: " + createdTrigger.getName());
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_create]
