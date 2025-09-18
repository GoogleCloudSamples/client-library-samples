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

# [START eventarc_v1_eventarc_pipeline_create]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def create_pipeline(
    project_id: str,
    location: str,
    pipeline_id: str,
    http_endpoint_uri: str,
) -> None:
    """
    Creates a new Eventarc pipeline.

    This sample demonstrates how to create an Eventarc pipeline that forwards
    events to a specified HTTP endpoint. Pipelines define how events are
    processed and routed within Eventarc.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the pipeline will be created (e.g., "us-central1").
            For a list of supported locations, see https://cloud.google.com/eventarc/docs/locations.
        pipeline_id: The user-provided ID to be assigned to the pipeline.
            Must be a lowercase alphanumeric string, up to 63 characters long, and must
            start with a letter. It can't end with a hyphen.
        http_endpoint_uri: The URI of the HTTP endpoint for the pipeline's destination.
            This should be a valid HTTPS URI.
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    http_endpoint = eventarc_v1.Pipeline.Destination.HttpEndpoint(uri=http_endpoint_uri)

    destination = eventarc_v1.Pipeline.Destination(http_endpoint=http_endpoint)

    pipeline = eventarc_v1.Pipeline(
        name=f"{parent}/pipelines/{pipeline_id}",
        destinations=[destination],
        display_name=f"Pipeline {pipeline_id}",
    )

    try:
        operation = client.create_pipeline(
            parent=parent,
            pipeline=pipeline,
            pipeline_id=pipeline_id,
        )

        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()

        print("Pipeline created")
        print(f"Name: {response.name}")
        print(f"UID: {response.uid}")
        if response.destinations:
            print(f"Destination URI: {response.destinations[0].http_endpoint.uri}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: Pipeline '{pipeline_id}' already exists in location '{location}'. "
            f"Please choose a different pipeline ID or delete the existing one. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_pipeline_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates an Eventarc pipeline with an HTTP endpoint destination."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region where the pipeline will be created (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--pipeline_id",
        help=(
            "The user-provided ID to be assigned to the pipeline. "
            "Must be a lowercase alphanumeric string, up to 63 characters long, and must "
            "start with a letter. It can't end with a hyphen."
        ),
        required=True,
    )
    parser.add_argument(
        "--http_endpoint_uri",
        help="The URI of the HTTP endpoint for the pipeline's destination.",
        default="https://example.com/webhook",
    )

    args = parser.parse_args()

    create_pipeline(
        project_id=args.project_id,
        location=args.location,
        pipeline_id=args.pipeline_id,
        http_endpoint_uri=args.http_endpoint_uri,
    )
