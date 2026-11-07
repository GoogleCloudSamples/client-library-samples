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

package com.google.cloud.documentai.v1;

// [START documentai_v1_documentprocessorservice_processorversions_list]
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.ProcessorVersion;

public class ListProcessorVersions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    listProcessorVersions(projectId, locationId, processorId);
  }

  public static void listProcessorVersions(
      String projectId, String locationId, String processorId) throws Exception {
    // Co-locate client requests with the location where the processor resides.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String parent =
          String.format(
              "projects/%s/locations/%s/processors/%s", projectId, locationId, processorId);

      for (ProcessorVersion processorVersion : client.listProcessorVersions(parent).iterateAll()) {
        System.out.printf("Processor version name: %s%n", processorVersion.getName());
        System.out.printf("Display name: %s%n", processorVersion.getDisplayName());
        System.out.printf("State: %s%n", processorVersion.getState());
      }
    }
  }
}
// [END documentai_v1_documentprocessorservice_processorversions_list]
