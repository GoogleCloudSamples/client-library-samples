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

# [START language_v1_languageservice_analyze_syntax]
import os

from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import language_v1


def analyze_syntax() -> None:
    """Analyzes the syntactic structure of text using the Language Service."""
    project_id = os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("GCLOUD_PROJECT")
    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = language_v1.LanguageServiceClient(client_options=client_options)

    document = language_v1.Document(
        content="Google Cloud provides infrastructure and analytics services.",
        type_=language_v1.Document.Type.PLAIN_TEXT,
    )

    try:
        response = client.analyze_syntax(
            request={
                "document": document,
                "encoding_type": language_v1.EncodingType.UTF8,
            }
        )

        print(f"Detected language: {response.language}")
        print(f"Sentence count: {len(response.sentences)}")
        print(f"Token count: {len(response.tokens)}")

        for token in response.tokens:
            part_of_speech_tag = token.part_of_speech.tag.name
            print(f"{token.text.content}: {part_of_speech_tag}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Syntax analysis failed: {error.message}")
# [END language_v1_languageservice_analyze_syntax]
