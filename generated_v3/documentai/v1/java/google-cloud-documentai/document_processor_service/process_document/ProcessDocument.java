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

// [START documentai_v1_documentprocessorservice_process_document]
import com.google.cloud.documentai.v1.Document;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.ProcessRequest;
import com.google.cloud.documentai.v1.ProcessResponse;
import com.google.cloud.documentai.v1.ProcessorName;
import com.google.cloud.documentai.v1.RawDocument;
import com.google.protobuf.ByteString;
import java.io.IOException;

public class ProcessDocument {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us";
    String processorId = "example-processor-id";
    processDocument(projectId, locationId, processorId);
  }

  public static void processDocument(String projectId, String locationId, String processorId)
      throws IOException {
    // Route API calls to the regional endpoint hosting the processor
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();

      // Construct a valid minimal PDF to prevent document parser errors
      String header = "%PDF-1.4\n";
      String obj1 = "1 0 obj\n<</Type /Catalog /Pages 2 0 R>>\nendobj\n";
      String obj2 = "2 0 obj\n<</Type /Pages /Kids [3 0 R] /Count 1>>\nendobj\n";
      String obj3 = "3 0 obj\n<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]>>\nendobj\n";

      int offset1 = header.length();
      int offset2 = offset1 + obj1.length();
      int offset3 = offset2 + obj2.length();
      int xrefOffset = offset3 + obj3.length();

      String xref =
          String.format(
              "xref\n0 4\n0000000000 65535 f \r\n%010d 00000 n \r\n%010d 00000 n \r\n%010d 00000 n \r\n",
              offset1, offset2, offset3);
      String trailer =
          String.format(
              "trailer\n<</Size 4 /Root 1 0 R>>\nstartxref\n%d\n%%%%EOF\n", xrefOffset);

      String pdfContent = header + obj1 + obj2 + obj3 + xref + trailer;

      RawDocument rawDocument =
          RawDocument.newBuilder()
              .setContent(ByteString.copyFromUtf8(pdfContent))
              .setMimeType("application/pdf")
              .build();

      ProcessRequest request =
          ProcessRequest.newBuilder()
              .setName(name)
              .setRawDocument(rawDocument)
              .build();

      ProcessResponse response = client.processDocument(request);
      Document document = response.getDocument();

      System.out.println("Document processed successfully.");
      System.out.printf("Document text length: %d%n", document.getText().length());
    }
  }
}
// [END documentai_v1_documentprocessorservice_process_document]
