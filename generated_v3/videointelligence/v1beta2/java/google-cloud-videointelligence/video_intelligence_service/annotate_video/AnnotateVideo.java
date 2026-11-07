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

package com.google.cloud.videointelligence.v1beta2;

// [START videointelligence_v1beta2_videointelligenceservice_annotate_video]
import com.google.cloud.videointelligence.v1beta2.AnnotateVideoRequest;
import com.google.cloud.videointelligence.v1beta2.AnnotateVideoResponse;
import com.google.cloud.videointelligence.v1beta2.Feature;
import com.google.cloud.videointelligence.v1beta2.LabelAnnotation;
import com.google.cloud.videointelligence.v1beta2.VideoAnnotationResults;
import com.google.cloud.videointelligence.v1beta2.VideoIntelligenceServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AnnotateVideo {

  public static void main(String[] args) throws Exception {
    annotateVideo();
  }

  public static void annotateVideo() throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (VideoIntelligenceServiceClient client = VideoIntelligenceServiceClient.create()) {
      String inputUri = "gs://cloud-samples-data/video/cat.mp4";
      Feature features = Feature.LABEL_DETECTION;

      AnnotateVideoRequest request =
          AnnotateVideoRequest.newBuilder()
              .setInputUri(inputUri)
              .addFeatures(features)
              .build();

      // Long-running operations require polling or waiting for the asynchronous operation to finish
      AnnotateVideoResponse response =
          client.annotateVideoAsync(request).get(300, TimeUnit.SECONDS);

      for (VideoAnnotationResults result : response.getAnnotationResultsList()) {
        for (LabelAnnotation annotation : result.getSegmentLabelAnnotationsList()) {
          System.out.println("Label: " + annotation.getEntity().getDescription());
        }
      }
    }
  }
}
// [END videointelligence_v1beta2_videointelligenceservice_annotate_video]
