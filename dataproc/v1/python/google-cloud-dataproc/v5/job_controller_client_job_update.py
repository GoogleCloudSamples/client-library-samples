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

# [START dataproc_v1_jobcontroller_update_job]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1
from google.protobuf import field_mask_pb2


def update_dataproc_job(
    project_id: str, location: str, job_id: str, labels_to_update: dict
) -> None:
    """
    Updates the labels of an existing Dataproc job.

    This function demonstrates how to update specific fields of a Dataproc job
    using a field mask. Only the fields specified in the field mask will be
    updated, allowing for partial updates without affecting other job properties.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region where the job is located (e.g., 'us-central1').
        job_id: The ID of the job to update.
        labels_to_update: A dictionary of label keys and values to set on the job.
                          Existing labels with the same keys will be overwritten.
                          To remove a label, set its value to an empty string.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.JobControllerClient(client_options=options)

    job = dataproc_v1.Job(labels=labels_to_update)

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    request = dataproc_v1.UpdateJobRequest(
        project_id=project_id,
        region=location,
        job_id=job_id,
        job=job,
        update_mask=update_mask,
    )

    print(f"Attempting to update job '{job_id}' in project '{project_id}'...")

    try:
        response = client.update_job(request=request)

        print(f"Job '{response.reference.job_id}' updated successfully.")
        print("Updated labels:")
        if response.labels:
            for key, value in response.labels.items():
                print(f"  {key}: {value}")
        else:
            print("  (No labels set)")

    except exceptions.NotFound:
        print(
            f"Error: Job '{job_id}' not found in project '{project_id}' in region '{location}'."
        )
        print("Please ensure the job ID, project ID, and region are correct.")
    except exceptions.InvalidArgument as e:
        print(f"Error updating job: Invalid argument provided. Details: {e}")
        print(
            "This might be due to an invalid job ID format or incorrect label values."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_jobcontroller_update_job]


def parse_labels_arg(labels_str: str) -> dict:
    """
    Parses a comma-separated string of key=value pairs into a dictionary.
    Example: "key1=value1,key2=value2" -> {"key1": "value1", "key2": "value2"}
    If a key is provided without a value (e.g., "key_to_remove"), its value
    will be set to an empty string, which typically signals removal in Dataproc.
    """
    labels = {}
    if labels_str:
        pairs = labels_str.split(",")
        for pair in pairs:
            if "=" in pair:
                key, value = pair.split("=", 1)
                labels[key.strip()] = value.strip()
            else:
                labels[pair.strip()] = ""
    return labels


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates labels of a Dataproc job.")
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Dataproc region where the job is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--job_id",
        required=True,
        help="The ID of the job to update.",
    )
    parser.add_argument(
        "--labels",
        help="Comma-separated key=value pairs for labels (e.g., 'env=dev,purpose=test'). "
        "To remove a label, provide its key without a value (e.g., 'old_key,new_key=value').",
        required=True,
        type=str,
    )

    args = parser.parse_args()

    parsed_labels = parse_labels_arg(args.labels)

    update_dataproc_job(
        args.project_id,
        args.location,
        args.job_id,
        parsed_labels,
    )
