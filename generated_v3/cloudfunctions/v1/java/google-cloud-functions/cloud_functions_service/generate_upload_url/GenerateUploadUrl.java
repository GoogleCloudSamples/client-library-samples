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

package com.google.cloud.cloudfunctions.v1;

// [START cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
import com.google.cloud.functions.v1.CloudFunctionsServiceClient;
import com.google.cloud.functions.v1.GenerateUploadUrlRequest;
import com.google.cloud.functions.v1.GenerateUploadUrlResponse;
import java.io.IOException;

public class GenerateUploadUrl {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    generateUploadUrl(projectId, locationId);
  }

  public static void generateUploadUrl(String projectId, String locationId) throws IOException {
    // Construct the parent resource path from the project and location identifiers.
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);

    try (CloudFunctionsServiceClient client = CloudFunctionsServiceClient.create()) {
      GenerateUploadUrlRequest request =
          GenerateUploadUrlRequest.newBuilder().setParent(parent).build();

      GenerateUploadUrlResponse response = client.generateUploadUrl(request);
      System.out.println("Upload URL: " + response.getUploadUrl());
    }
  }
}
// [END cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
