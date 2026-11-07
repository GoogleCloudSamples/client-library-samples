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

package com.google.cloud.datacatalog.v1beta1;

// [START datacatalog_v1beta1_datacatalog_test_iam_permissions]
import com.google.cloud.datacatalog.v1beta1.DataCatalogClient;
import com.google.cloud.datacatalog.v1beta1.TagTemplateName;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String tagTemplateId = "example-tag-template-id";
    testIamPermissions(projectId, locationId, tagTemplateId);
  }

  public static void testIamPermissions(
      String projectId, String locationId, String tagTemplateId) throws IOException {
    try (DataCatalogClient client = DataCatalogClient.create()) {
      List<String> permissions =
          Arrays.asList(
              "datacatalog.tagTemplates.getIamPolicy",
              "datacatalog.tagTemplates.setIamPolicy");
      String resource =
          TagTemplateName.of(projectId, locationId, tagTemplateId).toString();

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addAllPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);
      System.out.printf("Permissions granted (%d):%n", response.getPermissionsCount());
      for (String permission : response.getPermissionsList()) {
        System.out.printf("- %s%n", permission);
      }
    }
  }
}
// [END datacatalog_v1beta1_datacatalog_test_iam_permissions]
