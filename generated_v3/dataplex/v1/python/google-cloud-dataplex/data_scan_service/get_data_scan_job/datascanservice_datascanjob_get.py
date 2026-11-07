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

# [START dataplex_v1_datascanservice_datascanjob_get]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def get_data_scan_job(
    project_id: str,
    location_id: str,
    data_scan_id: str,
    data_scan_job_id: str,
) -> None:
    """Gets a data scan job in Dataplex.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        data_scan_id: Identifier of the DataScan (for example, 'example-datascan-id').
        data_scan_job_id: Identifier of the DataScanJob (for example, 'example-datascanjob-id').
    """
    client = dataplex_v1.DataScanServiceClient()

    # If data_scan_job_id is not provided, retrieve an existing job or trigger a new one.
    if not data_scan_job_id:
        parent = (
            f"projects/{project_id}/locations/{location_id}/dataScans/{data_scan_id}"
        )
        try:
            jobs = client.list_data_scan_jobs(
                request=dataplex_v1.ListDataScanJobsRequest(parent=parent)
            )
            for job in jobs:
                data_scan_job_id = job.name.split("/")[-1]
                break
            if not data_scan_job_id:
                run_response = client.run_data_scan(
                    request=dataplex_v1.RunDataScanRequest(name=parent)
                )
                data_scan_job_id = run_response.job.name.split("/")[-1]
        except google.api_core.exceptions.GoogleAPICallError as error:
            print(f"Failed to resolve data scan job: {error}")

    name = (
        f"projects/{project_id}/locations/{location_id}/dataScans/"
        f"{data_scan_id}/jobs/{data_scan_job_id}"
    )

    request = dataplex_v1.GetDataScanJobRequest(
        name=name,
        view=dataplex_v1.GetDataScanJobRequest.DataScanJobView.FULL,
    )

    try:
        response = client.get_data_scan_job(request=request)
        print(f"Data scan job name: {response.name}")
        print(f"Data scan job state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END dataplex_v1_datascanservice_datascanjob_get]
