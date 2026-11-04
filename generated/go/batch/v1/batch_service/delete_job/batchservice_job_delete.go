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

package snippets

// [START batch_v1_batchservice_job_delete]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
)

// deleteJob deletes an existing Batch job.
func deleteJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &batchpb.DeleteJobRequest{
		Name: name,
	}

	op, err := client.DeleteJob(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteJob: %w", err)
	}

	// DeleteJob is a long-running operation; wait for deletion to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted job: %s\n", name)

	return nil
}

// [END batch_v1_batchservice_job_delete]
