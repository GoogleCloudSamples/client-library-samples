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

from translationservice_text_romanize import romanize_text

# Support environment variables with optional CLI argument overrides
project_number_or_id = os.environ.get("PROJECT_NUMBER_OR_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_number_or_id:
    project_number_or_id = project_number_or_id.strip("'\"")
if not project_number_or_id:
    project_number_or_id = ""


if __name__ == "__main__":
    romanize_text(project_number_or_id)

