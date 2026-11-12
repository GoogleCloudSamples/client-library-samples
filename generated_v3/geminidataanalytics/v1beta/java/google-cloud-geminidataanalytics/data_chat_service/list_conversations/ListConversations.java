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

package com.google.cloud.geminidataanalytics.v1beta;

// [START geminidataanalytics_v1beta_datachatservice_conversations_list]
import com.google.cloud.geminidataanalytics.v1beta.Conversation;
import com.google.cloud.geminidataanalytics.v1beta.DataChatServiceClient;
import com.google.cloud.geminidataanalytics.v1beta.ListConversationsRequest;

public class ListConversations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listConversations(projectId, locationId);
  }

  public static void listConversations(String projectId, String locationId) throws Exception {
    try (DataChatServiceClient client = DataChatServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListConversationsRequest request =
          ListConversationsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (Conversation conversation : client.listConversations(request).iterateAll()) {
        System.out.println("Conversation name: " + conversation.getName());
      }
    }
  }
}
// [END geminidataanalytics_v1beta_datachatservice_conversations_list]
