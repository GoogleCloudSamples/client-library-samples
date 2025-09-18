# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START eventarc_v1_eventarc_pipeline_update]
from google.api_core import exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2


def update_pipeline(
    project_id: str,
    location: str,
    pipeline_id: str,
    new_http_endpoint_uri: str,
) -> None:
    """
    Updates an existing Eventarc pipeline to change its HTTP endpoint URI.

    This sample demonstrates how to modify an existing Eventarc pipeline's
    configuration, specifically updating its HTTP endpoint destination. Pipelines
    are used to route events from various sources to a specified destination.
    Updating a pipeline allows you to change where events are sent without
    recreating the entire event flow.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the pipeline is located (e.g., "us-central1").
        pipeline_id: The ID of the pipeline to update.
        new_http_endpoint_uri: The new URI for the HTTP endpoint destination.
    """
    client = eventarc_v1.EventarcClient()

    pipeline_name = client.pipeline_path(project_id, location, pipeline_id)

    # Create a Pipeline object with the updated destination information.
    # Only the fields specified in the update_mask will be applied.
    updated_pipeline = eventarc_v1.Pipeline(
        name=pipeline_name,
        destinations=[
            eventarc_v1.Pipeline.Destination(
                http_endpoint=eventarc_v1.Pipeline.Destination.HttpEndpoint(
                    uri=new_http_endpoint_uri
                )
            )
        ],
    )

    # Create a FieldMask to specify which fields to update.
    # In this case, we are updating the 'http_endpoint.uri' within the first destination.
    # Note: If there are multiple destinations, you would need to specify the index
    # or update all destinations as needed. For example, to update the URI of the
    # first destination, the path would be "destinations[0].http_endpoint.uri".
    # Since the sample assumes a single destination, "destinations.http_endpoint.uri"
    # is sufficient and more robust against index changes if only one destination exists.
    update_mask = field_mask_pb2.FieldMask(paths=["destinations.http_endpoint.uri"])

    try:
        request = eventarc_v1.UpdatePipelineRequest(
            pipeline=updated_pipeline,
            update_mask=update_mask,
        )

        operation = client.update_pipeline(request=request)

        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()

        print(f"Pipeline updated successfully: {response.name}")
        if response.destinations and response.destinations[0].http_endpoint:
            print(
                f"New HTTP Endpoint URI: {response.destinations[0].http_endpoint.uri}"
            )

    except exceptions.NotFound:
        print(f"Error: Pipeline '{pipeline_name}' not found.")
        print("Ensure the project ID, location, and pipeline ID are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error updating pipeline: {e}")
        print(
            "Please check your network connection, permissions, or API request parameters."
        )
    finally:
        client.close()


# [END eventarc_v1_eventarc_pipeline_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an Eventarc pipeline's HTTP endpoint URI."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the pipeline is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--pipeline_id",
        required=True,
        help="The ID of the pipeline to update.",
    )
    parser.add_argument(
        "--new_http_endpoint_uri",
        required=True,
        help="The new URI for the HTTP endpoint destination.",
    )

    args = parser.parse_args()

    update_pipeline(
        args.project_id,
        args.location,
        args.pipeline_id,
        args.new_http_endpoint_uri,
    )
