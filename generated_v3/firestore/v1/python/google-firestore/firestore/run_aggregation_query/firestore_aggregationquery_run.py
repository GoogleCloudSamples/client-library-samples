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

# [START firestore_v1_firestore_run_aggregation_query]
import google.api_core.exceptions
from google.cloud import firestore_v1
from google.cloud.firestore_v1.services.firestore import FirestoreClient


def run_aggregation_query(project_id: str, database_id: str) -> None:
    """Runs an aggregation query on a Firestore collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        database_id: ID of the Database (for example, 'example-database-id')
    """
    client = FirestoreClient()

    parent = f"projects/{project_id}/databases/{database_id}/documents"

    aggregation = firestore_v1.types.StructuredAggregationQuery.Aggregation(
        alias="total_count",
        count=firestore_v1.types.StructuredAggregationQuery.Aggregation.Count(),
    )

    structured_query = firestore_v1.types.StructuredQuery(
        from_=[
            firestore_v1.types.StructuredQuery.CollectionSelector(
                collection_id="users"
            )
        ]
    )

    aggregation_query = firestore_v1.types.StructuredAggregationQuery(
        structured_query=structured_query,
        aggregations=[aggregation],
    )

    request = firestore_v1.types.RunAggregationQueryRequest(
        parent=parent,
        structured_aggregation_query=aggregation_query,
    )

    try:
        response = client.run_aggregation_query(request=request)
        for partition in response:
            if partition.result:
                for alias, value in partition.result.aggregate_fields.items():
                    print(f"Aggregation result '{alias}': {value.integer_value}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END firestore_v1_firestore_run_aggregation_query]
