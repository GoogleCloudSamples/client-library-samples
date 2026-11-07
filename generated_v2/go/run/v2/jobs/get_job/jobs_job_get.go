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

// [START run_v2_jobs_job_get]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// getJob retrieves the specified Cloud Run job.
func getJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)

	client, err := run.NewJobsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewJobsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.GetJobRequest{
		Name: name,
	}

	job, err := client.GetJob(ctx, req)
	if err != nil {
		return fmt.Errorf("GetJob failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved job: %s\n", job.GetName())
	return nil
}

// [END run_v2_jobs_job_get]
