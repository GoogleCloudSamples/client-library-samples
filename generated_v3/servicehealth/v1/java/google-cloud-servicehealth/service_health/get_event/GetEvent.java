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

// [START servicehealth_v1_servicehealth_event_get]
import com.google.cloud.servicehealth.v1.Event;
import com.google.cloud.servicehealth.v1.EventName;
import com.google.cloud.servicehealth.v1.GetEventRequest;
import com.google.cloud.servicehealth.v1.ServiceHealthClient;
import java.io.IOException;

public class GetEvent {

  public static void main(String[] args) throws Exception {
    // Provide the Google Cloud project ID for which to retrieve the service health event.
    String projectId = "example-project-id";
    // Specify the location for the event. Use 'global' when retrieving events of category INCIDENT.
    String locationId = "global";
    // Specify the server-generated event ID to retrieve.
    String eventId = "example-event-id";

    getEvent(projectId, locationId, eventId);
  }

  public static void getEvent(String projectId, String locationId, String eventId)
      throws Exception {
    // Initialize client that will be used to send requests.
    // Client instances must be closed after use to avoid leaking resources.
    try (ServiceHealthClient client = ServiceHealthClient.create()) {
      String name = EventName.of(projectId, locationId, eventId).toString();

      GetEventRequest request = GetEventRequest.newBuilder().setName(name).build();

      Event response = client.getEvent(request);

      System.out.println("Retrieved event: " + response.getName());
      System.out.println("Title: " + response.getTitle());
      System.out.println("State: " + response.getState());
      System.out.println("Detailed state: " + response.getDetailedState());
    }
  }
}
// [END servicehealth_v1_servicehealth_event_get]
