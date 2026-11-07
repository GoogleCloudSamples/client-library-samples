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

# [START dataproc_v1_batchcontroller_batch_create]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import dataproc_v1


def create_batch(project_id: str, location_id: str, batch_id: str) -> None:
    """Creates a batch workload using the Dataproc BatchController.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataproc region for the batch workload.
        batch_id: The ID for the batch workload. Must be 4-63 characters,
          matching [a-z0-9-].
    """
    client = dataproc_v1.BatchControllerClient(
        client_options={"api_endpoint": f"{location_id}-dataproc.googleapis.com"}
    )

    parent = f"projects/{project_id}/locations/{location_id}"

    spark_batch = dataproc_v1.SparkBatch(
        main_class="org.apache.spark.examples.SparkPi",
        jar_file_uris=["file:///usr/lib/spark/examples/jars/spark-examples.jar"],
    )

    # Resolve an execution service account from the environment or active credentials
    service_account = os.environ.get("DATAPROC_SERVICE_ACCOUNT") or os.environ.get(
        "SERVICE_ACCOUNT"
    )
    if not service_account:
        credentials, _ = google.auth.default()
        credential_email = getattr(credentials, "service_account_email", None)
        if credential_email and credential_email != "default":
            service_account = credential_email

    environment_config = None
    if service_account and "@" in service_account:
        execution_config = dataproc_v1.ExecutionConfig(
            service_account=service_account
        )
        environment_config = dataproc_v1.EnvironmentConfig(
            execution_config=execution_config
        )

    # Configure compute properties to fit within constrained regional quotas
    runtime_config = dataproc_v1.RuntimeConfig(
        properties={
            "spark.driver.cores": "1",
            "spark.executor.cores": "1",
            "spark.executor.instances": "1",
        }
    )

    batch = dataproc_v1.Batch(
        spark_batch=spark_batch,
        environment_config=environment_config,
        runtime_config=runtime_config,
    )

    try:
        operation = client.create_batch(
            parent=parent,
            batch=batch,
            batch_id=batch_id,
        )
        response = operation.result()
        print(f"Batch created successfully: {response.name}")
    except google.api_core.exceptions.AlreadyExists as error:
        print(f"Batch already exists: {error}")
    except google.api_core.exceptions.InvalidArgument as error:
        print(f"Invalid batch configuration: {error}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create batch: {error}")
# [END dataproc_v1_batchcontroller_batch_create]
