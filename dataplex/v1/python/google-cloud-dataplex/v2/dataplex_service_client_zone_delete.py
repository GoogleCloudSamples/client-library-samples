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

# [START dataplex_v1_dataplexservice_delete_zone]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_dataplex_zone(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """Deletes a Dataplex zone.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake is located.
        lake_id: The ID of the lake to which the zone belongs.
        zone_id: The ID of the zone to delete.
    """
    client = dataplex_v1.DataplexServiceClient()

    zone_name = client.zone_path(project_id, location, lake_id, zone_id)

    print(f"Attempting to delete zone: {zone_name}")
    try:
        request = dataplex_v1.DeleteZoneRequest(name=zone_name)

        operation = client.delete_zone(request=request)

        operation.result()

        print(f"Zone {zone_name} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Zone {zone_name} not found. It may have already been deleted or never existed."
        )
        print(
            "Please check the project ID, location, lake ID, and zone ID for correctness."
        )
    except exceptions.FailedPrecondition as e:
        print(f"Error deleting zone {zone_name}: {e}")
        print(
            "A zone cannot be deleted if it contains assets. Please delete all assets within the zone first."
        )
    except Exception as e:
        print(f"An unexpected error occurred while deleting zone {zone_name}: {e}")
        print(
            "Please review the error message and consult Google Cloud documentation for further assistance."
        )


# [END dataplex_v1_dataplexservice_delete_zone]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataplex zone.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake containing the zone.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone to delete.",
    )
    args = parser.parse_args()

    delete_dataplex_zone(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
    )
