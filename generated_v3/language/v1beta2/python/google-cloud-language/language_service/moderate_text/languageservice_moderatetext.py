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

# [START language_v1beta2_languageservice_moderate_text]
import google.api_core.exceptions
from google.cloud import language_v1beta2

client = language_v1beta2.LanguageServiceClient()


def moderate_text() -> None:
    """Moderate text content for harmful or sensitive categories."""
    document = language_v1beta2.Document(
        content="Natural language processing enables analysis of text content.",
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )

    try:
        response = client.moderate_text(document=document)
        for category in response.moderation_categories:
            print(f"Category: {category.name}, Confidence: {category.confidence:.2f}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Moderation request failed: {error}")


# [END language_v1beta2_languageservice_moderate_text]
