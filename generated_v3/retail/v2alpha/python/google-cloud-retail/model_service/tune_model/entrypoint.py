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

from modelservice_model_tune import tune_model

# Support environment variables with optional CLI argument overrides
location_id = os.environ.get("LOCATION_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if location_id:
    location_id = location_id.strip("'\"")
if not location_id:
    location_id = ""

catalog_id = os.environ.get("CATALOG_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if catalog_id:
    catalog_id = catalog_id.strip("'\"")
if not catalog_id:
    catalog_id = ""

model_id = os.environ.get("MODEL_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if model_id:
    model_id = model_id.strip("'\"")
if not model_id:
    model_id = ""

project_number = os.environ.get("PROJECT_NUMBER") or (sys.argv[4] if len(sys.argv) > 4 else None)
if project_number:
    project_number = project_number.strip("'\"")
if not project_number:
    project_number = ""


if __name__ == "__main__":
    tune_model(location_id, catalog_id, model_id, project_number)

