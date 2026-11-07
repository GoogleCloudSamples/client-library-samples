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

package com.google.cloud.retail.v2alpha;

// [START retail_v2alpha_usereventservice_collect_user_event]
import com.google.api.HttpBody;
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.CatalogName;
import com.google.cloud.retail.v2alpha.CollectUserEventRequest;
import com.google.cloud.retail.v2alpha.UserEventServiceClient;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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
      String parent = CatalogName.of(projectId, locationId, catalogId).toString();
      // The API requires the user event payload to be URL-encoded.
      String userEvent =
          URLEncoder.encode(
              "{\"eventType\":\"detail-page-view\",\"visitorId\":\"example-visitor-id\"}",
              StandardCharsets.UTF_8);

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
        System.out.println(
            "Cloud Retail service requires terms acceptance in the Google Cloud console.");
      }
    }
  }
}
// [END retail_v2alpha_usereventservice_collect_user_event]
