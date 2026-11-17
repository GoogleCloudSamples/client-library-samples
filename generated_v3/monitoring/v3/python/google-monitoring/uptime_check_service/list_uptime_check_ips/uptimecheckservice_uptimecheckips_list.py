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

# [START monitoring_v3_uptimecheckservice_uptimecheckips_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.UptimeCheckServiceClient()


def list_uptime_check_ips() -> None:
    """List uptime check IP addresses."""
    try:
        request = monitoring_v3.ListUptimeCheckIpsRequest()
        page_result = client.list_uptime_check_ips(request=request)

        for uptime_check_ip in page_result:
            print(
                f"Region: {uptime_check_ip.region}, "
                f"Location: {uptime_check_ip.location}, "
                f"IP Address: {uptime_check_ip.ip_address}"
            )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list uptime check IPs: {error}")
# [END monitoring_v3_uptimecheckservice_uptimecheckips_list]
