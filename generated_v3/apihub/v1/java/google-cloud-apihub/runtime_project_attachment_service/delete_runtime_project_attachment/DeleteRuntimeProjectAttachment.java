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

package com.google.cloud.apihub.v1;

// [START apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_delete]
import com.google.cloud.apihub.v1.DeleteRuntimeProjectAttachmentRequest;
import com.google.cloud.apihub.v1.RuntimeProjectAttachmentName;
import com.google.cloud.apihub.v1.RuntimeProjectAttachmentServiceClient;

public class DeleteRuntimeProjectAttachment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String runtimeProjectAttachmentId = "example-runtime_project_attachment_id";
    deleteRuntimeProjectAttachment(projectId, locationId, runtimeProjectAttachmentId);
  }

  public static void deleteRuntimeProjectAttachment(
      String projectId, String locationId, String runtimeProjectAttachmentId) throws Exception {
    // Initialize the client that manages runtime project attachment operations.
    try (RuntimeProjectAttachmentServiceClient client =
        RuntimeProjectAttachmentServiceClient.create()) {
      String name =
          RuntimeProjectAttachmentName.of(projectId, locationId, runtimeProjectAttachmentId)
              .toString();
      DeleteRuntimeProjectAttachmentRequest request =
          DeleteRuntimeProjectAttachmentRequest.newBuilder().setName(name).build();

      client.deleteRuntimeProjectAttachment(request);
      System.out.println("Deleted runtime project attachment: " + name);
    }
  }
}
// [END apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_delete]
