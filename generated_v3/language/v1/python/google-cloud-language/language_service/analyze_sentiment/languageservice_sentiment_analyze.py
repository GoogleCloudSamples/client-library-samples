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

# [START language_v1_languageservice_analyze_sentiment]
import google.api_core.exceptions
from google.cloud import language_v1

client = language_v1.LanguageServiceClient()


def analyze_sentiment() -> None:
    """Use the analyze_sentiment method

    Args:

    """
    document = language_v1.Document(
        content=(
            "Google Cloud Natural Language API provides powerful text"
            " analysis features. The service delivers exceptional performance."
        ),
        type_=language_v1.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1.EncodingType.UTF8

    try:
        response = client.analyze_sentiment(
            document=document,
            encoding_type=encoding_type,
        )

        sentiment = response.document_sentiment
        print(f"Overall document sentiment score: {sentiment.score:.2f}")
        print(f"Overall document sentiment magnitude: {sentiment.magnitude:.2f}")
        print(f"Language detected: {response.language}")

        for sentence in response.sentences:
            print(f"Sentence: {sentence.text.content}")
            print(f"  Score: {sentence.sentiment.score:.2f}")
            print(f"  Magnitude: {sentence.sentiment.magnitude:.2f}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"API request failed: {exc}")


# [END language_v1_languageservice_analyze_sentiment]
