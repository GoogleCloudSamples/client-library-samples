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

# [START language_v1beta2_languageservice_analyze_entities]
import os

from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import language_v1beta2


def analyze_entities() -> None:
    """Analyzes entities in a string of text."""
    project_id = (
        os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("PROJECT_ID")
        or os.getenv("GCLOUD_PROJECT")
    )
    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = language_v1beta2.LanguageServiceClient(
        client_options=client_options
    )

    document = language_v1beta2.Document(
        content="Google, headquartered in Mountain View, unveiled new innovations.",
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )

    request = language_v1beta2.AnalyzeEntitiesRequest(
        document=document,
        encoding_type=language_v1beta2.EncodingType.UTF8,
    )

    try:
        response = client.analyze_entities(request=request)
        for entity in response.entities:
            print(f"Entity name: {entity.name}")
            print(f"Entity type: {entity.type_.name}")
            print(f"Salience: {entity.salience}")
    except google.api_core.exceptions.PermissionDenied as e:
        print(f"Permission denied: {e}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END language_v1beta2_languageservice_analyze_entities]
