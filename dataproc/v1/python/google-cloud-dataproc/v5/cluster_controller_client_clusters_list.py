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

# [START dataproc_v1_clustercontroller_clusters_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_dataproc_clusters(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all Dataproc clusters in a given project and region.

    This function demonstrates how to retrieve a list of Dataproc clusters
    within a specified Google Cloud project and region using the
    `list_clusters` method. It iterates through the paginated response
    and prints details for each cluster found.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region (e.g., 'us-central1') where the clusters
                are located.
    """
    try:
        options = client_options.ClientOptions(
            api_endpoint=f"{location}-dataproc.googleapis.com:443"
        )
        client = dataproc_v1.ClusterControllerClient(client_options=options)
        request = dataproc_v1.ListClustersRequest(
            project_id=project_id,
            region=location,
        )

        print(f"Listing clusters in project '{project_id}' and region '{location}'...")
        page_result = client.list_clusters(request=request)

        clusters_found = False
        for cluster in page_result:
            clusters_found = True
            print("--------------------------------------------------")
            print(f"Cluster Name: {cluster.cluster_name}")
            print(f"Project ID: {cluster.project_id}")
            print(f"Cluster UUID: {cluster.cluster_uuid}")
            print(f"Status: {cluster.status.state.name}")
            if cluster.status.detail:
                print(f"Status Detail: {cluster.status.detail}")
            print(f"Creation Time: {cluster.status.state_start_time.isoformat()}")
            if cluster.config and cluster.config.gce_cluster_config:
                print(f"Zone URI: {cluster.config.gce_cluster_config.zone_uri}")
            print("--------------------------------------------------")

        if not clusters_found:
            print(f"No clusters found in project '{project_id}' and region '{location}'.")
        else:
            print("Cluster listing complete.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project '{project_id}' or region '{location}' was not found or accessible."
        )
        print(
            f"Please ensure the project ID is correct and the region is valid for Dataproc."
        )
        print(f"Details: {e}")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_clustercontroller_clusters_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Dataproc clusters in a specified project and region."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Dataproc location (e.g., 'us-central1') where the clusters are located.",
    )

    args = parser.parse_args()

    list_dataproc_clusters(args.project_id, args.location)
