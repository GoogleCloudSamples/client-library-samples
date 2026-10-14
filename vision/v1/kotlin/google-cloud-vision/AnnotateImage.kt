// [START vision_annotate_image]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
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
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param gcsUri Cloud Storage URI of the target image (for example, "gs://example-bucket/example-image.jpg").
 */
fun annotateImage(projectId: String, gcsUri: String) {
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

      if (imageResponse != null && imageResponse.hasError()) {
        System.err.println(
          "error: annotation failed for image '$gcsUri' in project '$projectId': ${imageResponse.error.message}"
        )
      } else if (imageResponse != null) {
        println("Resource ID: $gcsUri")
        println("Annotation Count: ${imageResponse.labelAnnotationsCount}")
        for (annotation in imageResponse.labelAnnotationsList) {
          println("Description: ${annotation.description}")
          println("Mid: ${annotation.mid}")
          println("Score: ${annotation.score}")
        }
      }
    }
  } catch (err: NotFoundException) {
    System.err.println(
      "error: image '$gcsUri' not found for project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to annotate image '$gcsUri' for project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize Vision client for image '$gcsUri' in project '$projectId': ${err.message}"
    )
  }
}
// [END vision_annotate_image]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val gcsUri =
    args.getOrNull(1)
      ?: System.getenv("GCS_URI")
      ?: "gs://example-vision-bucket/example-image.jpg"

  annotateImage(projectId, gcsUri)
}
