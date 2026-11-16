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

package com.google.cloud.accessapproval.v1;

// [START accessapproval_v1_accessapproval_approvalrequests_list]
import com.google.cloud.accessapproval.v1.AccessApprovalAdminClient;
import com.google.cloud.accessapproval.v1.ApprovalRequest;
import com.google.cloud.accessapproval.v1.ListApprovalRequestsMessage;
import java.io.IOException;

public class ListApprovalRequests {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listApprovalRequests(projectId);
  }

  public static void listApprovalRequests(String projectId) throws Exception {
    try (AccessApprovalAdminClient client = AccessApprovalAdminClient.create()) {
      String parent = String.format("projects/%s", projectId);
      ListApprovalRequestsMessage request =
          ListApprovalRequestsMessage.newBuilder().setParent(parent).build();

      for (ApprovalRequest approvalRequest : client.listApprovalRequests(request).iterateAll()) {
        System.out.printf("Approval Request Name: %s%n", approvalRequest.getName());
        System.out.printf("Requested Resource: %s%n", approvalRequest.getRequestedResourceName());
      }
    }
  }
}
// [END accessapproval_v1_accessapproval_approvalrequests_list]
