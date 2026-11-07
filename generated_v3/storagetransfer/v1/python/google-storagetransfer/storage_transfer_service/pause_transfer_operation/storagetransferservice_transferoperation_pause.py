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

# [START storagetransfer_v1_storagetransferservice_pause_transfer_operation]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def pause_transfer_operation(name: str) -> None:
    """Pauses an in-progress transfer operation.

    Args:
        name: The server-generated resource name of the transfer operation to pause,
            in the format `transferOperations/{operation_id}`. Sourced from an active
            transfer execution (for example, the Operation returned by RunTransferJob).
    """
    client = storage_transfer_v1.StorageTransferServiceClient()
    request = storage_transfer_v1.PauseTransferOperationRequest(name=name)

    try:
        client.pause_transfer_operation(request=request)
        print(f"Paused transfer operation: {name}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        print(f"Error pausing transfer operation: {exc}")


# [END storagetransfer_v1_storagetransferservice_pause_transfer_operation]
