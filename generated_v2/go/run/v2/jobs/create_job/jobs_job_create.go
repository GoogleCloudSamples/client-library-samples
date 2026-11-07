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

// [START run_v2_jobs_job_create]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// createJob demonstrates how to create a Cloud Run job.
func createJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	job := &runpb.Job{
		Template: &runpb.ExecutionTemplate{
			Template: &runpb.TaskTemplate{
				Containers: []*runpb.Container{
					{
						Image: "us-docker.pkg.dev/cloudrun/container/job:latest",
					},
				},
			},
		},
	}

	client, err := run.NewJobsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewJobsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.CreateJobRequest{
		Parent: parent,
		Job:    job,
		JobId:  jobID,
	}

	op, err := client.CreateJob(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateJob failed: %w", err)
	}

	createdJob, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to complete CreateJob operation: %w", err)
	}

	fmt.Fprintf(w, "Created job: %s\n", createdJob.GetName())
	return nil
}

// [END run_v2_jobs_job_create]
