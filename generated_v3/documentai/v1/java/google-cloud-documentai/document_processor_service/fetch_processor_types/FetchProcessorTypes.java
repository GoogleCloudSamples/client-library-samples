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

// [START documentai_v1_documentprocessorservice_fetch_processor_types]
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.FetchProcessorTypesRequest;
import com.google.cloud.documentai.v1.FetchProcessorTypesResponse;
import com.google.cloud.documentai.v1.ProcessorType;
import java.io.IOException;

public class FetchProcessorTypes {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us";
    fetchProcessorTypes(projectId, locationId);
  }

  public static void fetchProcessorTypes(String projectId, String locationId) throws Exception {
    // Configure the client to connect to the regional endpoint.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      FetchProcessorTypesRequest request =
          FetchProcessorTypesRequest.newBuilder().setParent(parent).build();

      FetchProcessorTypesResponse response = client.fetchProcessorTypes(request);

      for (ProcessorType processorType : response.getProcessorTypesList()) {
        System.out.printf("Processor Type: %s%n", processorType.getType());
        System.out.printf("Category: %s%n", processorType.getCategory());
        System.out.printf("Allow Creation: %b%n", processorType.getAllowCreation());
      }
    }
  }
}
// [END documentai_v1_documentprocessorservice_fetch_processor_types]
