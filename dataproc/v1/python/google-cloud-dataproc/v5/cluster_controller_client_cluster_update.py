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

# [START dataproc_v1_clustercontroller_cluster_update]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1
from google.protobuf import field_mask_pb2


def update_dataproc_cluster(project_id: str, location: str, cluster_name: str) -> None:
    """
    Updates the number of worker instances in a Dataproc cluster.

    This sample demonstrates how to resize a Dataproc cluster by changing
    the number of worker nodes. The `update_cluster` method is used for this
    purpose, requiring a field mask to specify which part of the cluster
    configuration is being updated.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region where the cluster is located (e.g., "us-central1").
        cluster_name: The name of the Dataproc cluster to update.
    """
    new_num_workers = 3

    updated_cluster = dataproc_v1.Cluster(
        project_id=project_id,
        cluster_name=cluster_name,
        config=dataproc_v1.ClusterConfig(
            worker_config=dataproc_v1.InstanceGroupConfig(num_instances=new_num_workers)
        ),
    )

    update_mask = field_mask_pb2.FieldMask(paths=["config.worker_config.num_instances"])

    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.ClusterControllerClient(client_options=options)

    request = dataproc_v1.UpdateClusterRequest(
        project_id=project_id,
        region=location,
        cluster_name=cluster_name,
        cluster=updated_cluster,
        update_mask=update_mask,
    )

    print(f"Updating cluster '{cluster_name}' in region '{location}'...")

    try:
        operation = client.update_cluster(request=request)
        response = operation.result()

        print(f"Cluster '{response.cluster_name}' updated successfully.")
        print(
            f"New number of worker instances: {response.config.worker_config.num_instances}"
        )

    except exceptions.NotFound:
        print(
            f"Error: Cluster '{cluster_name}' not found in project '{project_id}' and region '{location}'."
        )
        print("Please ensure the cluster name, project ID, and region are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.code} - {e.message}")
        print(
            "Common causes include invalid permissions, incorrect project/region, or malformed request."
        )
        print("Please review the error message and check your configuration.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please check your network connection or general Python environment setup."
        )


# [END dataproc_v1_clustercontroller_cluster_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates the number of worker instances in a Dataproc cluster."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Dataproc region where the cluster is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--cluster_name",
        required=True,
        help="The name of the Dataproc cluster to update.",
    )
    args = parser.parse_args()

    update_dataproc_cluster(args.project_id, args.location, args.cluster_name)
