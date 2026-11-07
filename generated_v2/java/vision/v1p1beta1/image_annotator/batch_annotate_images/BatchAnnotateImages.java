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

package com.google.cloud.vision.v1p1beta1;

// [START vision_v1p1beta1_imageannotator_batch_annotate_images]
import com.google.cloud.vision.v1p1beta1.AnnotateImageRequest;
import com.google.cloud.vision.v1p1beta1.AnnotateImageResponse;
import com.google.cloud.vision.v1p1beta1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1p1beta1.EntityAnnotation;
import com.google.cloud.vision.v1p1beta1.Feature;
import com.google.cloud.vision.v1p1beta1.Image;
import com.google.cloud.vision.v1p1beta1.ImageAnnotatorClient;
import com.google.cloud.vision.v1p1beta1.ImageSource;
import java.util.ArrayList;
import java.util.List;

public class BatchAnnotateImages {

  public static void main(String[] args) throws Exception {
    batchAnnotateImages();
  }

  public static void batchAnnotateImages() throws Exception {
    // Initialize client that will be used to send requests.
    // The client only needs to be created once, and can be reused for multiple requests.
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      ImageSource imageSource =
          ImageSource.newBuilder()
              .setImageUri("gs://cloud-samples-data/vision/label/setagaya.jpeg")
              .build();
      Image image = Image.newBuilder().setSource(imageSource).build();
      Feature feature =
          Feature.newBuilder()
              .setType(Feature.Type.LABEL_DETECTION)
              .setMaxResults(5)
              .build();
      AnnotateImageRequest request =
          AnnotateImageRequest.newBuilder()
              .setImage(image)
              .addFeatures(feature)
              .build();

      List<AnnotateImageRequest> requests = new ArrayList<>();
      requests.add(request);

      BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);

      for (AnnotateImageResponse res : response.getResponsesList()) {
        if (res.hasError()) {
          System.out.printf("Error: %s%n", res.getError().getMessage());
          return;
        }

        for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
          System.out.printf(
              "Description: %s, Score: %.2f%n",
              annotation.getDescription(), annotation.getScore());
        }
      }
    }
  }
}
// [END vision_v1p1beta1_imageannotator_batch_annotate_images]
