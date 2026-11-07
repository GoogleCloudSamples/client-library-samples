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

// [START cloudbuild_v2_cloudbuild_workerpool_delete]

import (
	"context"
	"fmt"
	"io"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv1/v2"
	cloudbuildpb "cloud.google.com/go/cloudbuild/apiv1/v2/cloudbuildpb"
)

// deleteWorkerPool deletes a Cloud Build worker pool.
func deleteWorkerPool(ctx context.Context, w io.Writer, projectID string, locationID string, workerPoolID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workerPools/%s", projectID, locationID, workerPoolID)

	client, err := cloudbuild.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudbuildpb.DeleteWorkerPoolRequest{
		Name: name,
	}

	op, err := client.DeleteWorkerPool(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteWorkerPool: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted worker pool: %s\n", name)

	return nil
}

// [END cloudbuild_v2_cloudbuild_workerpool_delete]
