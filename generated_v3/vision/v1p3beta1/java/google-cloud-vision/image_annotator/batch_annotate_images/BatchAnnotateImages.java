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

package com.google.cloud.vision.v1p3beta1;

// [START vision_v1p3beta1_imageannotator_batch_annotate_images]
import com.google.cloud.vision.v1p3beta1.AnnotateImageRequest;
import com.google.cloud.vision.v1p3beta1.AnnotateImageResponse;
import com.google.cloud.vision.v1p3beta1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1p3beta1.EntityAnnotation;
import com.google.cloud.vision.v1p3beta1.Feature;
import com.google.cloud.vision.v1p3beta1.Image;
import com.google.cloud.vision.v1p3beta1.ImageAnnotatorClient;
import com.google.cloud.vision.v1p3beta1.ImageSource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BatchAnnotateImages {

  public static void main(String[] args) throws Exception {
    batchAnnotateImages();
  }

  public static void batchAnnotateImages() throws Exception {
    // Initialize the client with Application Default Credentials
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      List<AnnotateImageRequest> requests = new ArrayList<>();

      ImageSource imageSource =
          ImageSource.newBuilder()
              .setImageUri("gs://cloud-samples-data/vision/label/wakeupcat.jpg")
              .build();
      Image image = Image.newBuilder().setSource(imageSource).build();
      Feature feature = Feature.newBuilder().setType(Feature.Type.LABEL_DETECTION).build();

      AnnotateImageRequest request =
          AnnotateImageRequest.newBuilder().setImage(image).addFeatures(feature).build();
      requests.add(request);

      BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);

      for (AnnotateImageResponse res : response.getResponsesList()) {
        if (res.hasError()) {
          System.out.printf("Error: %s%n", res.getError().getMessage());
          return;
        }

        for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
          System.out.printf(
              "Label: %s, Score: %.4f%n",
              annotation.getDescription(), annotation.getScore());
        }
      }
    }
  }
}
// [END vision_v1p3beta1_imageannotator_batch_annotate_images]
