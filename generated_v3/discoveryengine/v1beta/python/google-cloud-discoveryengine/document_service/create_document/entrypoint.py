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

from documentservice_document_create import create_document

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

collection_id = os.environ.get("COLLECTION_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if collection_id:
    collection_id = collection_id.strip("'\"")
if not collection_id:
    collection_id = ""

data_store_id = os.environ.get("DATA_STORE_ID") or (sys.argv[4] if len(sys.argv) > 4 else None)
if data_store_id:
    data_store_id = data_store_id.strip("'\"")
if not data_store_id:
    data_store_id = ""

branch_id = os.environ.get("BRANCH_ID") or (sys.argv[5] if len(sys.argv) > 5 else None)
if branch_id:
    branch_id = branch_id.strip("'\"")
if not branch_id:
    branch_id = ""

document_id = os.environ.get("DOCUMENT_ID") or (sys.argv[6] if len(sys.argv) > 6 else None)
if document_id:
    document_id = document_id.strip("'\"")
if not document_id:
    document_id = ""


if __name__ == "__main__":
    create_document(project_id, location_id, collection_id, data_store_id, branch_id, document_id)

