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

// [START cloudscheduler_v1_cloudscheduler_job_create]

import (
	"context"
	"fmt"
	"io"

	cloudscheduler "cloud.google.com/go/scheduler/apiv1"
	schedulerpb "cloud.google.com/go/scheduler/apiv1/schedulerpb"
)

// createJob creates a new job in Cloud Scheduler.
func createJob(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := cloudscheduler.NewCloudSchedulerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudSchedulerClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	httpTarget := &schedulerpb.HttpTarget{
		Uri:        "https://example.com/ping",
		HttpMethod: schedulerpb.HttpMethod_GET,
	}

	job := &schedulerpb.Job{
		Target: &schedulerpb.Job_HttpTarget{
			HttpTarget: httpTarget,
		},
		Schedule: "* * * * *",
		TimeZone: "UTC",
	}

	req := &schedulerpb.CreateJobRequest{
		Parent: parent,
		Job:    job,
	}

	resp, err := client.CreateJob(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateJob: %w", err)
	}

	fmt.Fprintf(w, "Created job: %s\n", resp.GetName())
	return nil
}

// [END cloudscheduler_v1_cloudscheduler_job_create]
