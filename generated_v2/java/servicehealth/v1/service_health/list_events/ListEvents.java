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

package com.google.cloud.servicehealth.v1;

// [START servicehealth_v1_servicehealth_events_list]
import com.google.cloud.servicehealth.v1.Event;
import com.google.cloud.servicehealth.v1.ListEventsRequest;
import com.google.cloud.servicehealth.v1.ServiceHealthClient;
import java.io.IOException;

public class ListEvents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listEvents(projectId, locationId);
  }

  public static void listEvents(String projectId, String locationId) throws Exception {
    try (ServiceHealthClient client = ServiceHealthClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListEventsRequest request = ListEventsRequest.newBuilder()
          .setParent(parent)
          .build();

      for (Event event : client.listEvents(request).iterateAll()) {
        System.out.printf("Event name: %s%n", event.getName());
        System.out.printf("State: %s%n", event.getState());
        System.out.printf("Detailed state: %s%n", event.getDetailedState());
      }
    }
  }
}
// [END servicehealth_v1_servicehealth_events_list]
