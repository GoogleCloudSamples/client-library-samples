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

# [START videointelligence_v1_videointelligenceservice_annotate_video]
import google.api_core.exceptions
from google.cloud import videointelligence_v1

client = videointelligence_v1.VideoIntelligenceServiceClient()


def annotate_video(input_uri: str) -> None:
    """Use the annotate_video method

    Args:
        input_uri: The Google Cloud Storage URI of the video to annotate (e.g., 'gs://cloud-samples-data/video/cat.mp4').
    """
    features = [videointelligence_v1.Feature.LABEL_DETECTION]

    try:
        operation = client.annotate_video(
            request={
                "input_uri": input_uri,
                "features": features,
            }
        )
        print(f"Processing video: {operation.operation.name}")
        response = operation.result(timeout=300)

        for result in response.annotation_results:
            for annotation in result.segment_label_annotations:
                print(f"Label: {annotation.entity.description}")
                for category in annotation.category_entities:
                    print(f"  Category: {category.description}")
                for segment in annotation.segments:
                    start = segment.segment.start_time_offset.total_seconds()
                    end = segment.segment.end_time_offset.total_seconds()
                    print(f"  Segment: {start}s to {end}s, confidence: {segment.confidence}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to annotate video: {error}")
    except google.api_core.exceptions.RetryError as error:
        print(f"Operation timed out: {error}")
# [END videointelligence_v1_videointelligenceservice_annotate_video]
