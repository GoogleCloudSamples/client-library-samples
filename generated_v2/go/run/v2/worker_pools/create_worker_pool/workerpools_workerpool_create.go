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

// [START run_v2_workerpools_workerpool_create]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// createWorkerPool creates a new worker pool in Cloud Run.
func createWorkerPool(ctx context.Context, w io.Writer, projectID string, workerPoolID string) error {
	parent := fmt.Sprintf("projects/%s/locations/us-central1", projectID)
	workerPool := &runpb.WorkerPool{
		Template: &runpb.WorkerPoolRevisionTemplate{
			Containers: []*runpb.Container{
				{
					Image: "us-docker.pkg.dev/cloudrun/container/hello:latest",
				},
			},
		},
	}

	client, err := run.NewWorkerPoolsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewWorkerPoolsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.CreateWorkerPoolRequest{
		Parent:       parent,
		WorkerPool:   workerPool,
		WorkerPoolId: workerPoolID,
	}

	op, err := client.CreateWorkerPool(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWorkerPool failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created worker pool: %s\n", resp.GetName())

	return nil
}

// [END run_v2_workerpools_workerpool_create]
