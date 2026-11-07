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

# [START spanner_fetch_cache_update]
import google.api_core.exceptions
from google.cloud import spanner_v1


def fetch_cache_update(project_id: str, instance_id: str, database_id: str) -> None:
    """Fetches cache updates for a Cloud Spanner database.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Spanner instance.
        database_id: The ID of the Cloud Spanner database.
    """
    client = spanner_v1.SpannerClient()
    database = (
        f"projects/{project_id}/instances/{instance_id}/databases/{database_id}"
    )

    try:
        response_stream = client.fetch_cache_update(database=database)
        for cache_update in response_stream:
            print(f"Received cache update: {cache_update}")
    except google.api_core.exceptions.MethodNotImplemented:
        print(
            "FetchCacheUpdate is not supported on this Cloud Spanner database."
        )
    except google.api_core.exceptions.NotFound:
        print(f"Database {database} does not exist.")
# [END spanner_fetch_cache_update]
