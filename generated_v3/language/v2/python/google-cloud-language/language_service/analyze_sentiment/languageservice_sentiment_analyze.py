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

# [START language_v2_languageservice_analyze_sentiment]
import google.api_core.exceptions
from google.cloud import language_v2

client = language_v2.LanguageServiceClient()


def analyze_sentiment() -> None:
    """Analyze sentiment in a text document."""
    document = language_v2.Document(
        content="Google Cloud Natural Language API provides powerful natural language understanding and sentiment analysis.",
        type_=language_v2.Document.Type.PLAIN_TEXT,
    )

    request = language_v2.AnalyzeSentimentRequest(
        document=document,
    )

    try:
        response = client.analyze_sentiment(request=request)
        print(f"Document sentiment score: {response.document_sentiment.score}")
        print(
            f"Document sentiment magnitude: {response.document_sentiment.magnitude}"
        )
        print(f"Language code: {response.language_code}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END language_v2_languageservice_analyze_sentiment]
