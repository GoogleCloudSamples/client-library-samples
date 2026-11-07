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

# [START vision_v1p3beta1_imageannotator_batch_annotate_images]
import os

from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import (
    InternalServerError,
    InvalidArgument,
    NotFound,
    PermissionDenied,
)
from google.cloud import vision_v1p3beta1


def batch_annotate_images() -> None:
    """Performs batch label detection on an image."""
    project_id = (
        os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("PROJECT_ID")
        or os.getenv("GCP_PROJECT")
    )
    options = ClientOptions(quota_project_id=project_id) if project_id else None
    client = vision_v1p3beta1.ImageAnnotatorClient(client_options=options)

    requests = [
        vision_v1p3beta1.AnnotateImageRequest(
            image=vision_v1p3beta1.Image(
                source=vision_v1p3beta1.ImageSource(
                    image_uri="gs://cloud-samples-data/vision/label/wakeupcat.jpg"
                )
            ),
            features=[
                vision_v1p3beta1.Feature(
                    type_=vision_v1p3beta1.Feature.Type.LABEL_DETECTION
                )
            ],
        )
    ]

    try:
        response = client.batch_annotate_images(requests=requests)
        for image_response in response.responses:
            if image_response.error.message:
                print(f"Annotation error: {image_response.error.message}")
                continue
            for label in image_response.label_annotations:
                print(f"Label: {label.description}, Score: {label.score}")
    except (
        InternalServerError,
        InvalidArgument,
        NotFound,
        PermissionDenied,
    ) as error:
        print(f"Request failed: {error}")


# [END vision_v1p3beta1_imageannotator_batch_annotate_images]
