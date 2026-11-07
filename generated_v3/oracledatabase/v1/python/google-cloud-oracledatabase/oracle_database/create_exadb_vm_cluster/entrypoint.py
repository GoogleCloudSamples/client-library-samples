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

import os
import sys

from oracledatabase_exadbvmcluster_create import create_exadb_vm_cluster

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

location_id = os.environ.get("LOCATION_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if location_id:
    location_id = location_id.strip("'\"")
if not location_id:
    location_id = ""

exadb_vm_cluster_id = os.environ.get("EXADB_VM_CLUSTER_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if exadb_vm_cluster_id:
    exadb_vm_cluster_id = exadb_vm_cluster_id.strip("'\"")
if not exadb_vm_cluster_id:
    exadb_vm_cluster_id = ""

odb_network_id = os.environ.get("ODB_NETWORK_ID") or (sys.argv[4] if len(sys.argv) > 4 else None)
if odb_network_id:
    odb_network_id = odb_network_id.strip("'\"")
if not odb_network_id:
    odb_network_id = ""

odb_subnet_id = os.environ.get("ODB_SUBNET_ID") or (sys.argv[5] if len(sys.argv) > 5 else None)
if odb_subnet_id:
    odb_subnet_id = odb_subnet_id.strip("'\"")
if not odb_subnet_id:
    odb_subnet_id = ""

backup_odb_subnet_id = os.environ.get("BACKUP_ODB_SUBNET_ID") or (sys.argv[6] if len(sys.argv) > 6 else None)
if backup_odb_subnet_id:
    backup_odb_subnet_id = backup_odb_subnet_id.strip("'\"")
if not backup_odb_subnet_id:
    backup_odb_subnet_id = ""

exascale_db_storage_vault_id = os.environ.get("EXASCALE_DB_STORAGE_VAULT_ID") or (sys.argv[7] if len(sys.argv) > 7 else None)
if exascale_db_storage_vault_id:
    exascale_db_storage_vault_id = exascale_db_storage_vault_id.strip("'\"")
if not exascale_db_storage_vault_id:
    exascale_db_storage_vault_id = ""


if __name__ == "__main__":
    create_exadb_vm_cluster(project_id, location_id, exadb_vm_cluster_id, odb_network_id, odb_subnet_id, backup_odb_subnet_id, exascale_db_storage_vault_id)

