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

# [START videointelligence_v1beta2_videointelligenceservice_annotate_video]
import google.api_core.exceptions
from google.cloud import videointelligence_v1beta2

client = videointelligence_v1beta2.VideoIntelligenceServiceClient()


def annotate_video(input_uri: str) -> None:
    """Annotates video labels using the Video Intelligence API.

    Args:
        input_uri: Cloud Storage URI of the input video to annotate (for example, 'gs://bucket-id/object-id').
    """
    features = [videointelligence_v1beta2.Feature.LABEL_DETECTION]

    try:
        operation = client.annotate_video(
            input_uri=input_uri,
            features=features,
        )
        print(f"Operation started: {operation.operation.name}")
        response = operation.result(timeout=300)

        for result in response.annotation_results:
            for segment_label in result.segment_label_annotations:
                confidence = (
                    segment_label.segments[0].confidence
                    if segment_label.segments
                    else 0.0
                )
                print(
                    f"Label: {segment_label.entity.description} (confidence: {confidence:.2f})"
                )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Video annotation failed: {error}")
# [END videointelligence_v1beta2_videointelligenceservice_annotate_video]
