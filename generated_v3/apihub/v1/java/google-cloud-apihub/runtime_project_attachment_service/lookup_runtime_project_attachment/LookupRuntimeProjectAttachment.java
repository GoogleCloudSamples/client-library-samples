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

// [START apihub_v1_runtimeprojectattachmentservice_lookup_runtime_project_attachment]
import com.google.cloud.apihub.v1.LookupRuntimeProjectAttachmentRequest;
import com.google.cloud.apihub.v1.LookupRuntimeProjectAttachmentResponse;
import com.google.cloud.apihub.v1.RuntimeProjectAttachmentServiceClient;
import java.io.IOException;

public class LookupRuntimeProjectAttachment {

  public static void lookupRuntimeProjectAttachment(String projectId, String locationId)
      throws IOException {
    // Initialize the client. Clients are thread-safe and can be reused for multiple requests.
    try (RuntimeProjectAttachmentServiceClient client =
        RuntimeProjectAttachmentServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      LookupRuntimeProjectAttachmentRequest request =
          LookupRuntimeProjectAttachmentRequest.newBuilder().setName(name).build();

      LookupRuntimeProjectAttachmentResponse response =
          client.lookupRuntimeProjectAttachment(request);

      System.out.println(
          "Runtime project attachment: " + response.getRuntimeProjectAttachment().getName());
    }
  }
}
// [END apihub_v1_runtimeprojectattachmentservice_lookup_runtime_project_attachment]
