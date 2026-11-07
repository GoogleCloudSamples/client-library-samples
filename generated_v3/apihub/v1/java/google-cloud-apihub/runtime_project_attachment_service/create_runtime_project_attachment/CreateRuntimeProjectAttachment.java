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

// [START apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_create]
import com.google.api.gax.rpc.AbortedException;
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.cloud.apihub.v1.RuntimeProjectAttachment;
import com.google.cloud.apihub.v1.RuntimeProjectAttachmentServiceClient;
import java.io.IOException;

public class CreateRuntimeProjectAttachment {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String runtimeProjectAttachmentId = "example-runtime-project-attachment-id";
    createRuntimeProjectAttachment(projectId, locationId, runtimeProjectAttachmentId);
  }

  public static void createRuntimeProjectAttachment(
      String projectId, String locationId, String runtimeProjectAttachmentId) throws IOException {
    try (RuntimeProjectAttachmentServiceClient client =
        RuntimeProjectAttachmentServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      RuntimeProjectAttachment runtimeProjectAttachment =
          RuntimeProjectAttachment.newBuilder()
              .setRuntimeProject(String.format("projects/%s", runtimeProjectAttachmentId))
              .build();

      RuntimeProjectAttachment response;
      try {
        response =
            client.createRuntimeProjectAttachment(
                parent, runtimeProjectAttachment, runtimeProjectAttachmentId);
      } catch (AlreadyExistsException | AbortedException e) {
        // Re-create the attachment if it already exists in the environment.
        String name =
            String.format("%s/runtimeProjectAttachments/%s", parent, runtimeProjectAttachmentId);
        client.deleteRuntimeProjectAttachment(name);
        response =
            client.createRuntimeProjectAttachment(
                parent, runtimeProjectAttachment, runtimeProjectAttachmentId);
      }

      System.out.println("Created runtime project attachment: " + response.getName());
    }
  }
}
// [END apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_create]
