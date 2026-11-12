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

package com.google.cloud.eventarc.v1;

// [START eventarc_v1_eventarc_enrollment_create]
import com.google.cloud.eventarc.v1.Enrollment;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.LocationName;

public class CreateEnrollment {

  public static void main(String[] args) throws Exception {
    String enrollmentId = "example-enrollment-id";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String messageBusId = "example-message-bus-id";
    createEnrollment(enrollmentId, projectId, locationId, messageBusId);
  }

  public static void createEnrollment(
      String enrollmentId, String projectId, String locationId, String messageBusId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      String messageBus =
          String.format("projects/%s/locations/%s/messageBuses/%s", projectId, locationId, messageBusId);
      String destination =
          String.format("projects/%s/locations/%s/pipelines/example-pipeline", projectId, locationId);

      Enrollment enrollment =
          Enrollment.newBuilder()
              .setMessageBus(messageBus)
              .setCelMatch("message.type == 'google.cloud.pubsub.topic.v1.messagePublished'")
              .setDestination(destination)
              .build();

      Enrollment response = client.createEnrollmentAsync(parent, enrollment, enrollmentId).get();
      System.out.println("Created enrollment: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_enrollment_create]
