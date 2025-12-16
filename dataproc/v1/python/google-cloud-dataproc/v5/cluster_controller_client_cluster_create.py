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

# [START dataproc_v1_clustercontroller_create_cluster]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import dataproc_v1
from google.api_core import client_options


def create_dataproc_cluster(
    project_id: str,
    location: str,
    cluster_name: str,
) -> None:
    """
    Creates a new Dataproc cluster with a master and worker nodes.

    This sample demonstrates how to create a basic Dataproc cluster using
    the `create_cluster` method. A cluster is a collection of Compute Engine
    instances that run Hadoop, Spark, Hive, and other open-source data tools.
    The creation process is an asynchronous operation, and the sample waits
    for the operation to complete.

    Args:
        project_id: The Google Cloud project ID where the cluster will be created.
        location: The Google Cloud region where the cluster will be located
            (e.g., 'us-central1').
        cluster_name: The name of the Dataproc cluster to create.
            Must be unique within the project and region.
    """

    options = client_options.ClientOptions(api_endpoint=f'{location}-dataproc.googleapis.com:443')
    client = dataproc_v1.ClusterControllerClient(client_options=options)

    master_config = dataproc_v1.InstanceGroupConfig(
        num_instances=1,
        machine_type_uri="n1-standard-4",
        disk_config=dataproc_v1.DiskConfig(
            boot_disk_size_gb=100,
            num_local_ssds=0,
        ),
    )

    worker_config = dataproc_v1.InstanceGroupConfig(
        num_instances=2,
        machine_type_uri="n1-standard-4",
        disk_config=dataproc_v1.DiskConfig(
            boot_disk_size_gb=100,
            num_local_ssds=0,
        ),
    )

    cluster_config = dataproc_v1.ClusterConfig(
        master_config=master_config,
        worker_config=worker_config,
    )

    cluster = dataproc_v1.Cluster(
        project_id=project_id,
        cluster_name=cluster_name,
        config=cluster_config,
    )

    request = dataproc_v1.CreateClusterRequest(
        project_id=project_id,
        region=location,
        cluster=cluster,
        request_id=f"create-cluster-{cluster_name}",
    )

    print(f"Creating cluster '{cluster_name}' in region '{location}'...")
    try:
        operation = client.create_cluster(request=request)
        result_cluster = operation.result()

        print(f"Cluster '{result_cluster.cluster_name}' created successfully.")
        print(f"Cluster ID: {result_cluster.cluster_uuid}")
        print(f"Status: {result_cluster.status.state}")

    except AlreadyExists:
        print(
            f"Error: Cluster '{cluster_name}' already exists in project '{project_id}' "
            f"and region '{location}'. Please choose a different name or delete the existing cluster."
        )
    except GoogleAPICallError as e:
        print(f"Error creating cluster: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_clustercontroller_create_cluster]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Dataproc cluster.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region for the cluster (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--cluster_name",
        type=str,
        required=True,
        help="The name of the Dataproc cluster to create.",
    )

    args = parser.parse_args()

    create_dataproc_cluster(args.project_id, args.location, args.cluster_name)
