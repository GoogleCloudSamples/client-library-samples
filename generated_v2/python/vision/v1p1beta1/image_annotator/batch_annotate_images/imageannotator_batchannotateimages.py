# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START vision_v1p1beta1_imageannotator_batch_annotate_images]
import google.api_core.exceptions
from google.cloud import vision_v1p1beta1

client = vision_v1p1beta1.ImageAnnotatorClient()


def batch_annotate_images() -> None:
    """Annotate a batch of images using the batch_annotate_images method."""
    image_source = vision_v1p1beta1.ImageSource(
        image_uri="gs://cloud-samples-data/vision/label/wakeupcat.jpg"
    )
    image = vision_v1p1beta1.Image(source=image_source)
    feature = vision_v1p1beta1.Feature(
        type_=vision_v1p1beta1.Feature.Type.LABEL_DETECTION,
        max_results=5,
    )
    requests = [
        vision_v1p1beta1.AnnotateImageRequest(
            image=image,
            features=[feature],
        )
    ]

    try:
        response = client.batch_annotate_images(requests=requests)
        for image_response in response.responses:
            for label in image_response.label_annotations:
                print(f"Label: {label.description}, Score: {label.score}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END vision_v1p1beta1_imageannotator_batch_annotate_images]
