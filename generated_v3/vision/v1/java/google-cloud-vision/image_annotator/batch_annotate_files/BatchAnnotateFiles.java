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

package com.google.cloud.vision.v1;

// [START vision_v1_imageannotator_batch_annotate_files]
import com.google.cloud.vision.v1.AnnotateFileRequest;
import com.google.cloud.vision.v1.AnnotateFileResponse;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateFilesResponse;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.GcsSource;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.InputConfig;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class BatchAnnotateFiles {

  public static void main(String[] args) throws IOException {
    batchAnnotateFiles();
  }

  public static void batchAnnotateFiles() throws IOException {
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      // Specify the Cloud Storage PDF source to analyze
      GcsSource gcsSource =
          GcsSource.newBuilder()
              .setUri("gs://cloud-samples-data/vision/document_understanding/kafka.pdf")
              .build();

      InputConfig inputConfig =
          InputConfig.newBuilder()
              .setMimeType("application/pdf")
              .setGcsSource(gcsSource)
              .build();

      // Specify document text detection to extract text from the PDF
      Feature feature =
          Feature.newBuilder()
              .setType(Feature.Type.DOCUMENT_TEXT_DETECTION)
              .build();

      AnnotateFileRequest fileRequest =
          AnnotateFileRequest.newBuilder()
              .setInputConfig(inputConfig)
              .addFeatures(feature)
              .build();

      List<AnnotateFileRequest> requests = Arrays.asList(fileRequest);

      BatchAnnotateFilesResponse response = client.batchAnnotateFiles(requests);
      for (AnnotateFileResponse fileResponse : response.getResponsesList()) {
        if (fileResponse.hasError()) {
          System.out.printf("Error: %s%n", fileResponse.getError().getMessage());
          continue;
        }
        System.out.printf("Total pages: %d%n", fileResponse.getTotalPages());
        for (AnnotateImageResponse pageResponse : fileResponse.getResponsesList()) {
          if (pageResponse.hasError()) {
            System.out.printf("Error: %s%n", pageResponse.getError().getMessage());
            continue;
          }
          if (pageResponse.hasFullTextAnnotation()) {
            System.out.printf(
                "Page text length: %d%n",
                pageResponse.getFullTextAnnotation().getText().length());
          }
        }
      }
    }
  }
}
// [END vision_v1_imageannotator_batch_annotate_files]
