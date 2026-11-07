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

# [START language_v1_languageservice_annotate_text]
import google.api_core.exceptions
from google.cloud import language_v1

client = language_v1.LanguageServiceClient()


def annotate_text() -> None:
    """Annotate text with syntax, entity, and sentiment analysis."""
    features = language_v1.AnnotateTextRequest.Features(
        extract_syntax=True,
        extract_entities=True,
        extract_document_sentiment=True,
    )
    document = language_v1.Document(
        content=(
            "Google, headquartered in Mountain View, unveiled the new Android"
            " phone at the Consumer Electronics Show."
        ),
        type_=language_v1.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1.EncodingType.UTF8

    try:
        response = client.annotate_text(
            request=language_v1.AnnotateTextRequest(
                document=document,
                features=features,
                encoding_type=encoding_type,
            )
        )

        print(f"Document language: {response.language}")
        print(f"Overall sentiment score: {response.document_sentiment.score}")
        print(
            f"Overall sentiment magnitude: {response.document_sentiment.magnitude}"
        )
        print(f"Detected entities: {len(response.entities)}")
        for entity in response.entities:
            print(f"- {entity.name} ({entity.type_.name})")
        print(f"Detected tokens: {len(response.tokens)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END language_v1_languageservice_annotate_text]
