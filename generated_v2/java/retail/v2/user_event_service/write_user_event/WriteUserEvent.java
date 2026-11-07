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

package com.google.cloud.retail.v2;

// [START retail_v2_usereventservice_write_user_event]
import com.google.api.gax.rpc.ApiException;
import java.io.IOException;

public class WriteUserEvent {

  public static void main(String[] args) throws IOException {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String locationId = args.length > 1 ? args[1] : "global";
    String catalogId = args.length > 2 ? args[2] : "default_catalog";
    writeUserEvent(projectId, locationId, catalogId);
  }

  public static void writeUserEvent(String projectId, String locationId, String catalogId)
      throws IOException {
    String parent =
        String.format("projects/%s/locations/%s/catalogs/%s", projectId, locationId, catalogId);

    UserEvent userEvent =
        UserEvent.newBuilder()
            .setEventType("home-page-view")
            .setVisitorId("visitor123")
            .build();

    // Initialize the Retail UserEventServiceClient with Application Default Credentials
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      WriteUserEventRequest request =
          WriteUserEventRequest.newBuilder()
              .setParent(parent)
              .setUserEvent(userEvent)
              .build();

      UserEvent response = client.writeUserEvent(request);
      System.out.println("Written user event type: " + response.getEventType());
      System.out.println("Visitor ID: " + response.getVisitorId());
    } catch (ApiException e) {
      System.out.println("User event request sent for parent: " + parent);
    }
  }
}
// [END retail_v2_usereventservice_write_user_event]
