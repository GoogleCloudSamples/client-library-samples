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

# [START dataproc_v1_clustercontroller_cluster_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_dataproc_cluster(
    project_id: str,
    location: str,
    cluster_name: str,
) -> None:
    """
    Retrieves the resource representation for a Dataproc cluster.

    This function demonstrates how to get details of an existing Dataproc cluster
    using the `get_cluster` method.

    Args:
        project_id: The Google Cloud project ID where the cluster is located.
        location: The Dataproc region where the cluster is located (e.g., "us-central1").
        cluster_name: The name of the cluster to retrieve.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.ClusterControllerClient(client_options=options)

    request = dataproc_v1.GetClusterRequest(
        project_id=project_id,
        region=location,
        cluster_name=cluster_name,
    )

    try:
        response = client.get_cluster(request=request)

        print(f"Successfully retrieved cluster: {response.cluster_name}")
        print(f"Project ID: {response.project_id}")
        print(f"Status: {response.status.state.name}")
        if response.config.master_config.num_instances:
            print(f"Master instances: {response.config.master_config.num_instances}")
        if response.config.worker_config.num_instances:
            print(f"Worker instances: {response.config.worker_config.num_instances}")
        if response.config.secondary_worker_config.num_instances:
            print(
                f"Secondary worker instances: {response.config.secondary_worker_config.num_instances}"
            )

    except exceptions.NotFound:
        print(
            f"Error: Cluster '{cluster_name}' not found in project '{project_id}' and region '{location}'."
        )
        print("Please ensure the cluster name, project ID, and region are correct.")
    except exceptions.ServiceUnavailable as e:
        print(f"Service unavailable. Please try again later: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_clustercontroller_cluster_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve details of a Dataproc cluster."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud Project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Dataproc region where the cluster is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--cluster_name",
        type=str,
        help="The name of the cluster to retrieve.",
        required=True,
    )
    args = parser.parse_args()

    get_dataproc_cluster(args.project_id, args.location, args.cluster_name)
