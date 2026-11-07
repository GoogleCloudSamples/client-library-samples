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

// [START documentai_v1beta3_documentprocessorservice_processorversions_list]
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.ProcessorName;
import com.google.cloud.documentai.v1beta3.ProcessorVersion;

public class ListProcessorVersions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorId = "example-processor-id";
    listProcessorVersions(projectId, locationId, processorId);
  }

  public static void listProcessorVersions(String projectId, String locationId, String processorId)
      throws Exception {
    // Configure the client endpoint for regional processors.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String parent = ProcessorName.of(projectId, locationId, processorId).toString();

      for (ProcessorVersion processorVersion : client.listProcessorVersions(parent).iterateAll()) {
        System.out.printf("Processor version name: %s%n", processorVersion.getName());
        System.out.printf("Display name: %s%n", processorVersion.getDisplayName());
        System.out.printf("State: %s%n", processorVersion.getState());
      }
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_processorversions_list]
