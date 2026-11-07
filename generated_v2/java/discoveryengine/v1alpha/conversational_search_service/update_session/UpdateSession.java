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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_conversationalsearchservice_session_update]
import com.google.cloud.discoveryengine.v1alpha.ConversationalSearchServiceClient;
import com.google.cloud.discoveryengine.v1alpha.Session;
import com.google.cloud.discoveryengine.v1alpha.SessionName;
import com.google.cloud.discoveryengine.v1alpha.UpdateSessionRequest;
import com.google.protobuf.FieldMask;

public class UpdateSession {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String dataStoreId = "example-data-store-id";
    String sessionId = "example-session-id";
    updateSession(projectId, locationId, dataStoreId, sessionId);
  }

  public static void updateSession(
      String projectId, String locationId, String dataStoreId, String sessionId)
      throws Exception {
    // Initialize client that will be closed automatically with try-with-resources.
    try (ConversationalSearchServiceClient client = ConversationalSearchServiceClient.create()) {
      Session session =
          Session.newBuilder()
              .setName(
                  SessionName.ofProjectLocationDataStoreSessionName(
                          projectId, locationId, dataStoreId, sessionId)
                      .toString())
              .setDisplayName("Updated Session")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      UpdateSessionRequest request =
          UpdateSessionRequest.newBuilder()
              .setSession(session)
              .setUpdateMask(updateMask)
              .build();

      Session response = client.updateSession(request);
      System.out.println("Updated session: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_conversationalsearchservice_session_update]
