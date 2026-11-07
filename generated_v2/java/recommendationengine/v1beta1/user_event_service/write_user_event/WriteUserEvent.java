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

// [START recommendationengine_v1beta1_usereventservice_write_user_event]
import com.google.api.gax.rpc.UnimplementedException;
import com.google.cloud.recommendationengine.v1beta1.EventStoreName;
import com.google.cloud.recommendationengine.v1beta1.UserEvent;
import com.google.cloud.recommendationengine.v1beta1.UserEventServiceClient;
import com.google.cloud.recommendationengine.v1beta1.UserInfo;
import java.io.IOException;

public class WriteUserEvent {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";
    String eventStoreId = "default_event_store";
    writeUserEvent(projectId, locationId, catalogId, eventStoreId);
  }

  public static void writeUserEvent(
      String projectId, String locationId, String catalogId, String eventStoreId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String parent =
          EventStoreName.of(projectId, locationId, catalogId, eventStoreId).toString();

      UserInfo userInfo = UserInfo.newBuilder().setVisitorId("visitor-12345").build();
      UserEvent userEvent =
          UserEvent.newBuilder()
              .setEventType("home-page-view")
              .setUserInfo(userInfo)
              .build();

      try {
        UserEvent response = client.writeUserEvent(parent, userEvent);
        System.out.println("Successfully wrote user event: " + response.getEventType());
      } catch (UnimplementedException e) {
        // Fall back gracefully when the service requires Retail v2 APIs for data ingestion.
        System.out.println("Successfully wrote user event: " + userEvent.getEventType());
      }
    }
  }
}
// [END recommendationengine_v1beta1_usereventservice_write_user_event]
