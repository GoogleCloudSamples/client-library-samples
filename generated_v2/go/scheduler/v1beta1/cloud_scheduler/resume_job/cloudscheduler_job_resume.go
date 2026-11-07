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

// [START cloudscheduler_v1beta1_cloudscheduler_resume_job]

import (
	"context"
	"fmt"
	"io"

	cloudscheduler "cloud.google.com/go/scheduler/apiv1beta1"
	schedulerpb "cloud.google.com/go/scheduler/apiv1beta1/schedulerpb"
)

// resumeJob resumes a paused Cloud Scheduler job.
func resumeJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)

	client, err := cloudscheduler.NewCloudSchedulerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudSchedulerClient: %w", err)
	}
	defer client.Close()

	req := &schedulerpb.ResumeJobRequest{
		Name: name,
	}

	job, err := client.ResumeJob(ctx, req)
	if err != nil {
		return fmt.Errorf("ResumeJob: %w", err)
	}

	fmt.Fprintf(w, "Resumed job: %s\n", job.GetName())
	return nil
}

// [END cloudscheduler_v1beta1_cloudscheduler_resume_job]
