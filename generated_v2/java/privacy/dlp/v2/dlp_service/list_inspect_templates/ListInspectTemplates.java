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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_inspecttemplates_list]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.InspectTemplate;
import com.google.privacy.dlp.v2.ListInspectTemplatesRequest;
import java.io.IOException;

public class ListInspectTemplates {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listInspectTemplates(projectId, locationId);
  }

  public static void listInspectTemplates(String projectId, String locationId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListInspectTemplatesRequest request =
          ListInspectTemplatesRequest.newBuilder().setParent(parent).build();

      for (InspectTemplate template : client.listInspectTemplates(request).iterateAll()) {
        System.out.println("Template name: " + template.getName());
        System.out.println("Template display name: " + template.getDisplayName());
      }
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplates_list]
