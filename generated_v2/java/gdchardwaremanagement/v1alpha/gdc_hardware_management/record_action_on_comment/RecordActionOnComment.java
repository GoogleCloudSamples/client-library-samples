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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_record_action_on_comment]
import com.google.cloud.gdchardwaremanagement.v1alpha.Comment;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.RecordActionOnCommentRequest;

public class RecordActionOnComment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String orderId = "example-order-id";
    String commentId = "example-comment-id";
    recordActionOnComment(projectId, locationId, orderId, commentId);
  }

  public static void recordActionOnComment(
      String projectId, String locationId, String orderId, String commentId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/orders/%s/comments/%s",
              projectId, locationId, orderId, commentId);
      RecordActionOnCommentRequest.ActionType actionType =
          RecordActionOnCommentRequest.ActionType.READ;

      RecordActionOnCommentRequest request =
          RecordActionOnCommentRequest.newBuilder()
              .setName(name)
              .setActionType(actionType)
              .build();

      Comment response = client.recordActionOnComment(request);
      System.out.println("Recorded action on comment: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_record_action_on_comment]
