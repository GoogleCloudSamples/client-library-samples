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

# [START language_v2_languageservice_classify_text]
import google.api_core.exceptions
from google.cloud import language_v2

client = language_v2.LanguageServiceClient()


def classify_text() -> None:
    """Classifies input text into topical categories."""
    document = language_v2.Document(
        content=(
            "Cloud computing provides on-demand access to computing resources"
            " such as virtual machines, storage, networking, and databases"
            " over the internet. Organizations utilize these services to scale"
            " software applications efficiently, optimize infrastructure"
            " expenses, and manage workloads reliably."
        ),
        type_=language_v2.Document.Type.PLAIN_TEXT,
    )

    request = language_v2.ClassifyTextRequest(
        document=document,
    )

    try:
        response = client.classify_text(request=request)
        for category in response.categories:
            print(f"Category: {category.name}")
            print(f"Confidence: {category.confidence:.2f}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to classify text: {e}")
# [END language_v2_languageservice_classify_text]
