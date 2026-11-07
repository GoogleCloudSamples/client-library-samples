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

from identityawareproxyoauthservice_identityawareproxyclientsecret_reset import reset_identity_aware_proxy_client_secret

# Support environment variables with optional CLI argument overrides
brand_id = os.environ.get("BRAND_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if brand_id:
    brand_id = brand_id.strip("'\"")
if not brand_id:
    brand_id = ""

client_id = os.environ.get("CLIENT_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if client_id:
    client_id = client_id.strip("'\"")
if not client_id:
    client_id = ""


if __name__ == "__main__":
    reset_identity_aware_proxy_client_secret(brand_id, client_id)

