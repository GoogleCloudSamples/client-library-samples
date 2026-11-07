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

# [START language_v1beta2_languageservice_analyze_sentiment]
import google.api_core.exceptions
from google.cloud import language_v1beta2

client = language_v1beta2.LanguageServiceClient()


def analyze_sentiment() -> None:
    """Analyze sentiment in a document using LanguageService."""
    document = language_v1beta2.Document(
        content="Google Cloud Natural Language API provides powerful text analysis.",
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1beta2.EncodingType.UTF8

    try:
        response = client.analyze_sentiment(
            document=document,
            encoding_type=encoding_type,
        )
        print(f"Document sentiment score: {response.document_sentiment.score}")
        print(
            f"Document sentiment magnitude: {response.document_sentiment.magnitude}"
        )
        for sentence in response.sentences:
            print(f"Sentence text: {sentence.text.content}")
            print(f"Sentence sentiment score: {sentence.sentiment.score}")
            print(
                f"Sentence sentiment magnitude: {sentence.sentiment.magnitude}"
            )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Language analysis failed: {e.message}")


# [END language_v1beta2_languageservice_analyze_sentiment]
