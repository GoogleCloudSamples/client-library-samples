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

# [START videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
import google.api_core.exceptions
from google.cloud import videointelligence_v1p3beta1

client = videointelligence_v1p3beta1.VideoIntelligenceServiceClient()


def annotate_video(input_uri: str) -> None:
    """Use the annotate_video method.

    Args:
        input_uri: Google Cloud Storage URI of the video to be annotated,
          formatted as 'gs://bucket-id/object-id'.
    """
    features = [videointelligence_v1p3beta1.Feature.LABEL_DETECTION]

    try:
        operation = client.annotate_video(
            input_uri=input_uri,
            features=features,
        )
        print(f"Processing video annotation operation: {operation.operation.name}")
        response = operation.result(timeout=300)

        for annotation_result in response.annotation_results:
            for segment_label in annotation_result.segment_label_annotations:
                print(f"Segment label: {segment_label.entity.description}")
                for category_entity in segment_label.category_entities:
                    print(f"  Category: {category_entity.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed with error: {e}")


# [END videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
