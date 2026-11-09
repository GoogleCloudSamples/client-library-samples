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

package com.google.cloud.videointelligence.v1p1beta1;

// [START videointelligence_v1p1beta1_videointelligenceservice_annotate_video]
import com.google.cloud.videointelligence.v1p1beta1.AnnotateVideoRequest;
import com.google.cloud.videointelligence.v1p1beta1.AnnotateVideoResponse;
import com.google.cloud.videointelligence.v1p1beta1.Feature;
import com.google.cloud.videointelligence.v1p1beta1.VideoAnnotationResults;
import com.google.cloud.videointelligence.v1p1beta1.VideoIntelligenceServiceClient;
import com.google.cloud.videointelligence.v1p1beta1.VideoIntelligenceServiceSettings;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AnnotateVideo {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    annotateVideo();
  }

  public static void annotateVideo()
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    VideoIntelligenceServiceSettings.Builder settingsBuilder =
        VideoIntelligenceServiceSettings.newBuilder();

    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    try (VideoIntelligenceServiceClient client =
        VideoIntelligenceServiceClient.create(settingsBuilder.build())) {
      Feature features = Feature.LABEL_DETECTION;

      AnnotateVideoRequest request =
          AnnotateVideoRequest.newBuilder()
              .setInputUri("gs://cloud-samples-data/video/cat.mp4")
              .addFeatures(features)
              .build();

      // Initiate the asynchronous video annotation operation and wait for completion
      AnnotateVideoResponse response =
          client.annotateVideoAsync(request).get(300, TimeUnit.SECONDS);

      System.out.println("Annotations received: " + response.getAnnotationResultsCount());
      for (VideoAnnotationResults result : response.getAnnotationResultsList()) {
        System.out.println("Video URI: " + result.getInputUri());
      }
    }
  }
}
// [END videointelligence_v1p1beta1_videointelligenceservice_annotate_video]
