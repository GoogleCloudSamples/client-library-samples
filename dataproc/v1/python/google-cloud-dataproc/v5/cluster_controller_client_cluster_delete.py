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

# [START dataproc_v1_clustercontroller_cluster_delete]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_dataproc_cluster(
    project_id: str,
    location: str,
    cluster_name: str,
) -> None:
    """
    Deletes a Dataproc cluster.

    This method demonstrates how to delete an existing Dataproc cluster.
    Deleting a cluster stops all running jobs on that cluster and deallocates
    all associated resources, such as Compute Engine instances and persistent disks.

    Args:
        project_id: The Google Cloud project ID where the cluster is located.
        location: The Dataproc region where the cluster is located (e.g., 'us-central1').
        cluster_name: The name of the cluster to delete.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.ClusterControllerClient(client_options=options)

    request = dataproc_v1.DeleteClusterRequest(
        project_id=project_id,
        region=location,
        cluster_name=cluster_name,
    )

    try:
        operation = client.delete_cluster(request=request)

        print(
            f"Waiting for cluster deletion operation for '{cluster_name}' to complete..."
        )

        # The result of a successful delete_cluster operation is an empty_pb2.Empty object.
        operation.result()

        print(
            f"Cluster '{cluster_name}' in project '{project_id}' and region '{location}' deleted successfully."
        )

    except exceptions.NotFound:
        print(
            f"Error: Cluster '{cluster_name}' not found in project '{project_id}' "
            f"and region '{location}'. Please check the cluster name and location."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to delete cluster '{cluster_name}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_clustercontroller_cluster_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataproc cluster.")
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Dataproc region where the cluster is located.",
    )
    parser.add_argument(
        "--cluster_name",
        type=str,
        help="The name of the cluster to delete.",
        required=True,
    )

    args = parser.parse_args()

    delete_dataproc_cluster(args.project_id, args.location, args.cluster_name)
