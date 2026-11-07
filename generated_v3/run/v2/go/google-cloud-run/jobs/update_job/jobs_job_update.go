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

// [START run_v2_jobs_job_update]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// updateJob updates an existing Cloud Run job.
func updateJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	client, err := run.NewJobsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewJobsClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)
	getReq := &runpb.GetJobRequest{
		Name: name,
	}

	// Retrieve the existing job to maintain full replacement integrity.
	job, err := client.GetJob(ctx, getReq)
	if err != nil {
		return fmt.Errorf("GetJob: %w", err)
	}

	// Update an inert mutable field on the job.
	if job.Labels == nil {
		job.Labels = make(map[string]string)
	}
	job.Labels["updated"] = "true"

	req := &runpb.UpdateJobRequest{
		Job: job,
	}

	op, err := client.UpdateJob(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateJob: %w", err)
	}

	updatedJob, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated job: %s\n", updatedJob.GetName())
	return nil
}

// [END run_v2_jobs_job_update]
