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

package com.google.cloud.documentai.v1beta3;

// [START documentai_v1beta3_documentprocessorservice_processorversion_get]
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.GetProcessorVersionRequest;
import com.google.cloud.documentai.v1beta3.ProcessorVersion;
import com.google.cloud.documentai.v1beta3.ProcessorVersionName;
import java.io.IOException;

public class GetProcessorVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorId = "example-processor-id";
    String processorVersionId = "example-processor-version-id";
    getProcessorVersion(projectId, locationId, processorId, processorVersionId);
  }

  public static void getProcessorVersion(
      String projectId, String locationId, String processorId, String processorVersionId)
      throws Exception {
    // Configure the client to use the regional endpoint required by Document AI.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name =
          ProcessorVersionName.of(projectId, locationId, processorId, processorVersionId).toString();

      GetProcessorVersionRequest request =
          GetProcessorVersionRequest.newBuilder().setName(name).build();

      ProcessorVersion processorVersion = client.getProcessorVersion(request);

      System.out.println("Processor Version Name: " + processorVersion.getName());
      System.out.println("Display Name: " + processorVersion.getDisplayName());
      System.out.println("State: " + processorVersion.getState());
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_processorversion_get]
