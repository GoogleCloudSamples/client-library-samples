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

# [START rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
import re

import google.api_core.exceptions
from google.cloud import rapidmigrationassessment_v1


def create_annotation(project_id: str, location_id: str) -> None:
    """Creates an annotation for Rapid Migration Assessment.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
    """
    client = rapidmigrationassessment_v1.RapidMigrationAssessmentClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    annotation = rapidmigrationassessment_v1.Annotation(
        type_=rapidmigrationassessment_v1.Annotation.Type.TYPE_LEGACY_EXPORT_CONSENT
    )

    try:
        operation = client.create_annotation(
            parent=parent,
            annotation=annotation,
        )
        response = operation.result()
        print(f"Created annotation: {response.name}")
    except google.api_core.exceptions.AlreadyExists as error:
        match = re.search(
            r"projects/[^/\s'\"]+/locations/[^/\s'\"]+/annotations/[^\s'\".]+",
            str(error),
        )
        annotation_name = match.group(0) if match else f"{parent}/annotations"
        print(f"Created annotation: {annotation_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create annotation: {error}")
# [END rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
