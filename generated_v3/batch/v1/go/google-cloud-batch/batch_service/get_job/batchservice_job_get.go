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

// [START batch_v1_batchservice_job_get]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
)

// Use the GetJob method.
func getJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &batchpb.GetJobRequest{
		Name: name,
	}

	job, err := client.GetJob(ctx, req)
	if err != nil {
		return fmt.Errorf("GetJob: %w", err)
	}

	fmt.Fprintf(w, "Job retrieved: %s\n", job.GetName())
	fmt.Fprintf(w, "Job state: %s\n", job.GetStatus().GetState())

	return nil
}

// [END batch_v1_batchservice_job_get]
