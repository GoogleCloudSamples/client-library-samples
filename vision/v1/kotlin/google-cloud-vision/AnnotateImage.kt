/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START vision_v1_imageannotator_batch_annotate_images]
// [START vision_imageannotator_batch_annotate_images]
// [START vision_label_detection_gcs]
// [START vision_quickstart]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.InvalidArgumentException
import com.google.cloud.vision.v1.AnnotateImageRequest
import com.google.cloud.vision.v1.Feature
import com.google.cloud.vision.v1.Image
import com.google.cloud.vision.v1.ImageAnnotatorClient
import com.google.cloud.vision.v1.ImageSource
import java.io.IOException

/**
 * Detects labels in an image stored in Google Cloud Storage using Cloud Vision.
 * Referencing a Cloud Storage URI avoids transferring raw image bytes from the
 * client workstation.
 *
 * @param gcsUri Cloud Storage URI of the target image (for example, "gs://example-bucket/example-image.jpg").
 */
fun annotateImage(gcsUri: String) {
  val imageSource = ImageSource.newBuilder().setGcsImageUri(gcsUri).build()
  val image = Image.newBuilder().setSource(imageSource).build()

  // Limit label detection to 5 results to return only high-confidence annotations.
  val feature =
    Feature.newBuilder()
      .setType(Feature.Type.LABEL_DETECTION)
      .setMaxResults(5)
      .build()
  val request =
      AnnotateImageRequest.newBuilder()
        .addFeatures(feature)
        .setImage(image)
        .build()

  try {
    ImageAnnotatorClient.create().use { client ->
      val response = client.batchAnnotateImages(listOf(request))
      val imageResponse = response.responsesList.firstOrNull()

      if (imageResponse == null) {
        System.err.println(
          "error: no response received from Vision API for image '$gcsUri'"
        )
      } else if (imageResponse.hasError()) {
        System.err.println(
          "error: annotation failed for image '$gcsUri': ${imageResponse.error.message}"
        )
      } else {
        println("Resource ID: $gcsUri")
        println("Annotation Count: ${imageResponse.labelAnnotationsCount}")
        for (annotation in imageResponse.labelAnnotationsList) {
          println("Description: ${annotation.description}")
          println("Mid: ${annotation.mid}")
          println("Score: ${annotation.score}")
        }
      }
    }
  } catch (err: InvalidArgumentException) {
    System.err.println(
      "error: invalid annotation request for image '$gcsUri': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to annotate image '$gcsUri': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize Vision client for image '$gcsUri': ${err.message}"
    )
  }
}
// [END vision_quickstart]
// [END vision_label_detection_gcs]
// [END vision_imageannotator_batch_annotate_images]
// [END vision_v1_imageannotator_batch_annotate_images]

fun main(args: Array<String>) {
  val gcsUri =
    args.getOrNull(0)
      ?: System.getenv("GCS_URI")
      ?: "gs://example-vision-bucket/example-image.jpg"

  annotateImage(gcsUri)
}
