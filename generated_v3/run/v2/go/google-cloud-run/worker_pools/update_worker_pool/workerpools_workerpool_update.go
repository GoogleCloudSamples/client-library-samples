// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START run_v2_workerpools_workerpool_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	run "cloud.google.com/go/run/apiv2"
	"cloud.google.com/go/run/apiv2/runpb"
)

// updateWorkerPool updates an existing Cloud Run worker pool.
func updateWorkerPool(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	workerPoolID := os.Getenv("WORKER_POOL_ID")
	if workerPoolID == "" {
		workerPoolID = "example-worker-pool"
	}

	workerPool := &runpb.WorkerPool{
		Name: fmt.Sprintf("projects/%s/locations/%s/workerPools/%s", projectID, location, workerPoolID),
		Labels: map[string]string{
			"environment": "staging",
		},
		Template: &runpb.WorkerPoolRevisionTemplate{
			Containers: []*runpb.Container{
				{
					Image: "us-docker.pkg.dev/cloudrun/container/hello",
				},
			},
		},
	}

	client, err := run.NewWorkerPoolsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewWorkerPoolsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.UpdateWorkerPoolRequest{
		WorkerPool: workerPool,
	}

	op, err := client.UpdateWorkerPool(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateWorkerPool failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated worker pool: %s\n", resp.GetName())
	return nil
}

// [END run_v2_workerpools_workerpool_update]
