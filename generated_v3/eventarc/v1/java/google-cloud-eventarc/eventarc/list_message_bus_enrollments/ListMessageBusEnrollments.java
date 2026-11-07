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

// [START eventarc_v1_eventarc_messagebusenrollments_list]
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.MessageBusName;

public class ListMessageBusEnrollments {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String messageBusId = "example-message_bus_id";
    listMessageBusEnrollments(projectId, locationId, messageBusId);
  }

  public static void listMessageBusEnrollments(
      String projectId, String locationId, String messageBusId) throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = MessageBusName.of(projectId, locationId, messageBusId).toString();
      for (String enrollment : client.listMessageBusEnrollments(parent).iterateAll()) {
        System.out.println("Enrollment: " + enrollment);
      }
    }
  }
}
// [END eventarc_v1_eventarc_messagebusenrollments_list]
