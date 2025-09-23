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

# [START monitoring_v3_uptimecheckservice_uptimecheckips_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_uptime_check_ips() -> None:
    """Lists the IP addresses that Google Cloud's Uptime Checkers run from.
    """
    client = monitoring_v3.UptimeCheckServiceClient()

    try:
        for ip in client.list_uptime_check_ips():
            print(f"Uptime Check IP: {ip.ip_address}")
            print(f"  Location: {ip.location}")
            print(f"  Region: {ip.region}")
            print("---------------------")

        print("Successfully listed all Uptime Check IPs.")

    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list Uptime Check IPs: {e}")
        print(
            "Please ensure your credentials are set up correctly and you have network connectivity."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_uptimecheckservice_uptimecheckips_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists the IP addresses used by Google Cloud Uptime Checkers."
    )

    args = parser.parse_args()

    list_uptime_check_ips()
