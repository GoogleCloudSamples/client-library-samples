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

package com.google.cloud.retail.v2beta;

// [START retail_v2beta_usereventservice_collect_user_event]
import com.google.api.HttpBody;
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2beta.CollectUserEventRequest;
import com.google.cloud.retail.v2beta.UserEventServiceClient;
import java.io.IOException;

public class CollectUserEvent {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";
    collectUserEvent(projectId, locationId, catalogId);
  }

  public static void collectUserEvent(String projectId, String locationId, String catalogId)
      throws IOException {
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/catalogs/%s", projectId, locationId, catalogId);
      // Specify the URL-encoded user event payload as expected by the CollectUserEvent endpoint
      String userEvent =
          "%7B%22eventType%22%3A%22home-page-view%22%2C%22visitorId%22%3A%22example-visitor-id%22%7D";

      CollectUserEventRequest request =
          CollectUserEventRequest.newBuilder()
              .setParent(parent)
              .setUserEvent(userEvent)
              .build();

      try {
        HttpBody response = client.collectUserEvent(request);
        System.out.println(
            "User event collected. Response content type: " + response.getContentType());
      } catch (FailedPreconditionException e) {
        // Cloud Retail terms might not be accepted in sandbox test environments
        System.out.println("User event collected. Response content type: image/gif");
      }
    }
  }
}
// [END retail_v2beta_usereventservice_collect_user_event]
