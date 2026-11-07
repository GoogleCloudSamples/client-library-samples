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

package com.google.cloud.translate.v3beta1;

// [START translate_v3beta1_translationservice_translate_document]
import com.google.cloud.translate.v3beta1.DocumentInputConfig;
import com.google.cloud.translate.v3beta1.LocationName;
import com.google.cloud.translate.v3beta1.TranslateDocumentRequest;
import com.google.cloud.translate.v3beta1.TranslateDocumentResponse;
import com.google.cloud.translate.v3beta1.TranslationServiceClient;
import com.google.protobuf.ByteString;
import java.io.IOException;

public class TranslateDocument {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    translateDocument(projectId, locationId);
  }

  public static void translateDocument(String projectId, String locationId) throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String targetLanguageCode = "fr";
      String parent = LocationName.of(projectId, locationId).toString();
      String samplePdf =
          "%PDF-1.4\n"
              + "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
              + "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
              + "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
              + "/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n"
              + "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
              + "5 0 obj\n<< /Length 44 >>\nstream\n"
              + "BT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\n"
              + "xref\n0 6\n"
              + "0000000000 65535 f \n"
              + "0000000009 00000 n \n"
              + "0000000058 00000 n \n"
              + "0000000115 00000 n \n"
              + "0000000241 00000 n \n"
              + "0000000311 00000 n \n"
              + "trailer\n<< /Size 6 /Root 1 0 R >>\n"
              + "startxref\n404\n%%EOF\n";
      DocumentInputConfig documentInputConfig =
          DocumentInputConfig.newBuilder()
              .setContent(ByteString.copyFromUtf8(samplePdf))
              .setMimeType("application/pdf")
              .build();

      TranslateDocumentRequest request =
          TranslateDocumentRequest.newBuilder()
              .setParent(parent)
              .setTargetLanguageCode(targetLanguageCode)
              .setDocumentInputConfig(documentInputConfig)
              .build();

      TranslateDocumentResponse response = client.translateDocument(request);

      System.out.printf(
          "Detected language: %s\n",
          response.getDocumentTranslation().getDetectedLanguageCode());
      System.out.printf(
          "Byte stream outputs count: %d\n",
          response.getDocumentTranslation().getByteStreamOutputsCount());
    }
  }
}
// [END translate_v3beta1_translationservice_translate_document]
