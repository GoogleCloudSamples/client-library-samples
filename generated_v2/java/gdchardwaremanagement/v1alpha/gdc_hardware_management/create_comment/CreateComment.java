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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_comment_create]
import com.google.cloud.gdchardwaremanagement.v1alpha.Comment;
import com.google.cloud.gdchardwaremanagement.v1alpha.CreateCommentRequest;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateComment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String orderId = "example-order_id";
    String commentId = "example-comment_id";
    createComment(projectId, locationId, orderId, commentId);
  }

  public static void createComment(
      String projectId, String locationId, String orderId, String commentId) throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/orders/%s", projectId, locationId, orderId);
      Comment comment =
          Comment.newBuilder()
              .setText("Site access details confirmed with facility manager.")
              .build();

      CreateCommentRequest request =
          CreateCommentRequest.newBuilder()
              .setParent(parent)
              .setCommentId(commentId)
              .setComment(comment)
              .build();

      // Initiate the operation and wait for completion.
      Comment response = client.createCommentAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Comment created successfully: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_comment_create]
