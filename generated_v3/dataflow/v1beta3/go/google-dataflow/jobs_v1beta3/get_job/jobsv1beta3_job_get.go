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

// [START dataflow_v1beta3_jobsv1beta3_job_get]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// getJob gets an existing Cloud Dataflow job by ID.
func getJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	client, err := dataflow.NewJobsV1Beta3Client(ctx)
	if err != nil {
		return fmt.Errorf("NewJobsV1Beta3Client failed: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.GetJobRequest{
		ProjectId: projectID,
		Location:  locationID,
		JobId:     jobID,
		View:      dataflowpb.JobView_JOB_VIEW_SUMMARY,
	}

	job, err := client.GetJob(ctx, req)
	if err != nil {
		return fmt.Errorf("GetJob: %w", err)
	}

	fmt.Fprintf(w, "Job ID: %s\nState: %s\nType: %s\n", job.GetId(), job.GetCurrentState(), job.GetType())
	return nil
}

// [END dataflow_v1beta3_jobsv1beta3_job_get]
