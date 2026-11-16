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

# [START oracledatabase_v1_oracledatabase_exadbvmcluster_create]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def create_exadb_vm_cluster(
    project_id: str,
    location_id: str,
    exadb_vm_cluster_id: str,
    odb_network_id: str,
    odb_subnet_id: str,
    backup_odb_subnet_id: str,
    exascale_db_storage_vault_id: str,
) -> None:
    """Creates an Exadata Database VM cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the resource is created (for example, 'us-central1').
        exadb_vm_cluster_id: The ID for the ExadbVmCluster (for example, 'example-exadb-vm-cluster').
        odb_network_id: The ID of the ODB Network (for example, 'example-odb-network-id').
        odb_subnet_id: The ID of the primary ODB Subnet for IP allocation (for example, 'example-odb-subnet-id').
        backup_odb_subnet_id: The ID of the backup ODB Subnet (for example, 'example-backup-odb-subnet-id').
        exascale_db_storage_vault_id: The ID of the Exascale DB Storage Vault (for example, 'example-storage-vault-id').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    storage_details = oracledatabase_v1.ExadbVmClusterStorageDetails(
        size_in_gbs_per_node=300
    )
    cluster_properties = oracledatabase_v1.ExadbVmClusterProperties(
        exascale_db_storage_vault=f"projects/{project_id}/locations/{location_id}/exascaleDbStorageVaults/{exascale_db_storage_vault_id}",
        node_count=2,
        enabled_ecpu_count_per_node=8,
        grid_image_id="example-grid-image-id",
        hostname_prefix="exavm",
        ssh_public_keys=[
            "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3examplepublickey user@example.com"
        ],
        vm_file_system_storage=storage_details,
        shape_attribute=oracledatabase_v1.ExadbVmClusterProperties.ShapeAttribute.SMART_STORAGE,
    )
    exadb_vm_cluster = oracledatabase_v1.ExadbVmCluster(
        display_name="Sample Exadb VM Cluster",
        odb_network=f"projects/{project_id}/locations/{location_id}/odbNetworks/{odb_network_id}",
        odb_subnet=f"projects/{project_id}/locations/{location_id}/odbNetworks/{odb_network_id}/odbSubnets/{odb_subnet_id}",
        backup_odb_subnet=f"projects/{project_id}/locations/{location_id}/odbNetworks/{odb_network_id}/odbSubnets/{backup_odb_subnet_id}",
        properties=cluster_properties,
    )

    try:
        operation = client.create_exadb_vm_cluster(
            parent=parent,
            exadb_vm_cluster_id=exadb_vm_cluster_id,
            exadb_vm_cluster=exadb_vm_cluster,
        )
        print("Waiting for operation to complete...")
        response = operation.result()
        print(f"Created Exadb VM Cluster: {response.name}")
    except google.api_core.exceptions.BadRequest as e:
        print(f"Marketplace entitlement required: {e.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request ended with message: {e.message}")
# [END oracledatabase_v1_oracledatabase_exadbvmcluster_create]
