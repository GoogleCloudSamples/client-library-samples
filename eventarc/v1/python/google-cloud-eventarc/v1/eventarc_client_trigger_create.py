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

# [START eventarc_v1_eventarc_trigger_create]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def create_trigger(
    project_id: str,
    location: str,
    trigger_id: str,
    service_account_email: str,
    destination_service: str,
    destination_region: str,
    event_type: str,
    bucket_name: str,
) -> None:
    """
    Creates a new Eventarc trigger that routes events to a Cloud Run service.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the trigger will be created (e.g., "us-central1").
        trigger_id: The ID to assign to the new trigger.
        service_account_email: The email of the service account associated with the trigger.
            This service account must have permissions to invoke the destination service.
        destination_service: The name of the Cloud Run service to which events will be sent.
        destination_region: The region where the Cloud Run service is deployed.
        event_type: The CloudEvents type to filter for (e.g., "google.cloud.storage.object.v1.finalized").
        bucket_name: The name of the bucket to use for events
    """
    client = eventarc_v1.EventarcClient()

    parent = client.common_location_path(project_id, location)

    cloud_run_destination = eventarc_v1.CloudRun(
        service=destination_service,
        region=destination_region,
        # Optional: Specify a path on the Cloud Run service to send events to.
        # path="/events",
    )

    destination = eventarc_v1.Destination(cloud_run=cloud_run_destination)

    event_filter_type = eventarc_v1.EventFilter(attribute="type", value=event_type)
    bucket_filter_type = eventarc_v1.EventFilter(attribute="bucket", value=bucket_name)

    trigger = eventarc_v1.Trigger(
        name=client.trigger_path(project_id, location, trigger_id),
        service_account=service_account_email,
        destination=destination,
        event_filters=[event_filter_type, bucket_filter_type],
    )

    try:
        operation = client.create_trigger(
            parent=parent,
            trigger=trigger,
            trigger_id=trigger_id,
        )
        response = operation.result()
        print(f"Trigger '{response.name}' created successfully.")
        print(
            f"Destination: Cloud Run service '{response.destination.cloud_run.service}' in region '{response.destination.cloud_run.region}'."
        )
        print(f"Event type filter: '{response.event_filters[0].value}'.")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: Trigger '{trigger_id}' already exists. Please choose a unique ID. Details: {e}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: One of the specified resources (e.g., project, location, service account, Cloud Run service) was not found. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_trigger_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create an Eventarc trigger.")
    parser.add_argument(
        "--project_id", help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region where the trigger will be created (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--trigger_id", help="The ID to assign to the new trigger.", required=True
    )
    parser.add_argument(
        "--service_account_email",
        help="The email of the service account associated with the trigger.",
        required=True,
    )
    parser.add_argument(
        "--destination_service",
        help="The name of the Cloud Run service to which events will be sent.",
        required=True,
    )
    parser.add_argument(
        "--destination_region",
        help="The region where the Cloud Run service is deployed.",
        required=True,
    )
    parser.add_argument(
        "--event_type",
        help="The CloudEvents type to filter for (default: 'google.cloud.storage.object.v1.finalized').",
        default="google.cloud.storage.object.v1.finalized",
    )
    parser.add_argument(
        "--bucket_name",
        help="The bucket to get events for (used with default storage-related event)",
        required=True,
    )

    args = parser.parse_args()

    create_trigger(
        project_id=args.project_id,
        location=args.location,
        trigger_id=args.trigger_id,
        service_account_email=args.service_account_email,
        destination_service=args.destination_service,
        destination_region=args.destination_region,
        event_type=args.event_type,
        bucket_name=args.bucket_name,
    )
