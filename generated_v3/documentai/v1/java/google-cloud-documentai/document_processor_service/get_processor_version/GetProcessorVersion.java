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

// [START documentai_v1_documentprocessorservice_processorversion_get]
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.GetProcessorVersionRequest;
import com.google.cloud.documentai.v1.ProcessorVersion;
import com.google.cloud.documentai.v1.ProcessorVersionName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class GetProcessorVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    String processorVersionId = "example-processor_version_id";
    getProcessorVersion(projectId, locationId, processorId, processorVersionId);
  }

  public static void getProcessorVersion(
      String projectId, String locationId, String processorId, String processorVersionId)
      throws Exception {
    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create()) {
      String name =
          ProcessorVersionName.of(projectId, locationId, processorId, processorVersionId).toString();
      GetProcessorVersionRequest request =
          GetProcessorVersionRequest.newBuilder().setName(name).build();

      ProcessorVersion response = client.getProcessorVersion(request);
      System.out.println("Processor version: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END documentai_v1_documentprocessorservice_processorversion_get]
