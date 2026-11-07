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

# [START language_v1beta2_languageservice_analyze_entity_sentiment]
import google.api_core.exceptions
from google.cloud import language_v1beta2

client = language_v1beta2.LanguageServiceClient()


def analyze_entity_sentiment() -> None:
    """Analyzes entity sentiment in text content."""
    document = language_v1beta2.Document(
        content=(
            "Google, headquartered in Mountain View, unveiled the new Android phone. "
            "The device has an amazing camera and exceptional battery life!"
        ),
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1beta2.EncodingType.UTF8

    try:
        response = client.analyze_entity_sentiment(
            document=document,
            encoding_type=encoding_type,
        )

        for entity in response.entities:
            print(f"Entity name: {entity.name}")
            print(f"Entity type: {entity.type_.name}")
            print(f"Salience: {entity.salience}")
            print(f"Sentiment score: {entity.sentiment.score}")
            print(f"Sentiment magnitude: {entity.sentiment.magnitude}")

    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END language_v1beta2_languageservice_analyze_entity_sentiment]
