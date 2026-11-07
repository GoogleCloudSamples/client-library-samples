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

# [START language_v2_languageservice_annotate_text]
import google.api_core.exceptions
from google.cloud import language_v2

client = language_v2.LanguageServiceClient()


def annotate_text() -> None:
    """Annotates text using the Natural Language API."""
    document = language_v2.Document(
        content=(
            "Google, headquartered in Mountain View, unveiled the new Android"
            " phone at the Consumer Electronic Show. Sundar Pichai said in his"
            " keynote that users love their new phones."
        ),
        type_=language_v2.Document.Type.PLAIN_TEXT,
    )
    features = language_v2.AnnotateTextRequest.Features(
        extract_entities=True,
        extract_document_sentiment=True,
    )
    encoding_type = language_v2.EncodingType.UTF8

    try:
        response = client.annotate_text(
            document=document,
            features=features,
            encoding_type=encoding_type,
        )

        print(f"Detected language: {response.language_code}")
        print(f"Sentiment score: {response.document_sentiment.score}")
        print(f"Sentiment magnitude: {response.document_sentiment.magnitude}")
        for entity in response.entities:
            print(f"Entity: {entity.name}, Type: {entity.type_.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")


# [END language_v2_languageservice_annotate_text]
