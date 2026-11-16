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

package com.google.cloud.apphub.v1;

// [START apphub_v1_apphub_lookup_service_project_attachment]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.LookupServiceProjectAttachmentRequest;
import com.google.cloud.apphub.v1.LookupServiceProjectAttachmentResponse;
import java.io.IOException;

public class LookupServiceProjectAttachment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    lookupServiceProjectAttachment(projectId, locationId);
  }

  public static void lookupServiceProjectAttachment(String projectId, String locationId)
      throws Exception {
    try (AppHubClient client = AppHubClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      LookupServiceProjectAttachmentRequest request =
          LookupServiceProjectAttachmentRequest.newBuilder().setName(name).build();

      LookupServiceProjectAttachmentResponse response =
          client.lookupServiceProjectAttachment(request);

      if (response.hasServiceProjectAttachment()) {
        System.out.println(
            "Service project attachment: " + response.getServiceProjectAttachment().getName());
      } else {
        System.out.println("No service project attachment found for the location.");
      }
    }
  }
}
// [END apphub_v1_apphub_lookup_service_project_attachment]
