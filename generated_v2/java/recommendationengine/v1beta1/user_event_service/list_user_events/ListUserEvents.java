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

package com.google.cloud.recommendationengine.v1beta1;

// [START recommendationengine_v1beta1_usereventservice_userevents_list]
import com.google.cloud.recommendationengine.v1beta1.ListUserEventsRequest;
import com.google.cloud.recommendationengine.v1beta1.UserEvent;
import com.google.cloud.recommendationengine.v1beta1.UserEventServiceClient;

public class ListUserEvents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listUserEvents(projectId, locationId);
  }

  public static void listUserEvents(String projectId, String locationId) throws Exception {
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/catalogs/default_catalog/eventStores/default_event_store",
              projectId, locationId);

      ListUserEventsRequest request = ListUserEventsRequest.newBuilder().setParent(parent).build();

      for (UserEvent userEvent : client.listUserEvents(request).iterateAll()) {
        System.out.println("User event type: " + userEvent.getEventType());
      }
    }
  }
}
// [END recommendationengine_v1beta1_usereventservice_userevents_list]
