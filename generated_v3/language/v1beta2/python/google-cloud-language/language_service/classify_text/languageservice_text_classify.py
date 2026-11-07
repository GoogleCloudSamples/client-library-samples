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

# [START language_v1beta2_languageservice_classify_text]
import google.api_core.exceptions
from google.cloud import language_v1beta2

client = language_v1beta2.LanguageServiceClient()


def classify_text() -> None:
    """Classify text content into predefined content categories."""
    # Natural Language text classification requires a minimum of 20 words in the input text.
    document = language_v1beta2.Document(
        content=(
            "Google Cloud provides scalable cloud computing resources, data analytics,"
            " machine learning solutions, and developer tools to help organizations"
            " build, innovate, and deploy software applications globally."
        ),
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )

    request = language_v1beta2.ClassifyTextRequest(document=document)

    try:
        response = client.classify_text(request=request)
        for category in response.categories:
            print(f"Category: {category.name}")
            print(f"Confidence: {category.confidence}")
    except google.api_core.exceptions.GoogleAPIError as error:
        print(f"Classification failed: {error}")
# [END language_v1beta2_languageservice_classify_text]
