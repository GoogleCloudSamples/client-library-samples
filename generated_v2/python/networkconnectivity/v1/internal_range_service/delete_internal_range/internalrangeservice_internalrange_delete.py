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

# [START networkconnectivity_v1_internalrangeservice_internalrange_delete]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1


def delete_internal_range(
    project_id: str, location_id: str, internal_range_id: str
) -> None:
    """Deletes an internal range resource.

    Args:
        project_id: The Google Cloud project ID hosting the internal range.
        location_id: The location of the internal range resource.
        internal_range_id: The identifier of the internal range to delete.
    """
    client = networkconnectivity_v1.InternalRangeServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/internalRanges/{internal_range_id}"

    try:
        request = networkconnectivity_v1.DeleteInternalRangeRequest(name=name)
        operation = client.delete_internal_range(request=request)
        operation.result()
        print(f"Deleted internal range: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Deleted internal range: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error deleting internal range: {error}")
# [END networkconnectivity_v1_internalrangeservice_internalrange_delete]
