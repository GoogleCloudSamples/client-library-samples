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

// [START cloudscheduler_v1beta1_cloudscheduler_run_job]

import (
	"context"
	"fmt"
	"io"

	cloudscheduler "cloud.google.com/go/scheduler/apiv1beta1"
	schedulerpb "cloud.google.com/go/scheduler/apiv1beta1/schedulerpb"
)

// runJob triggers execution of a Cloud Scheduler job.
func runJob(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s", projectID, locationID, jobID)

	client, err := cloudscheduler.NewCloudSchedulerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudSchedulerClient: %w", err)
	}
	defer client.Close()

	req := &schedulerpb.RunJobRequest{
		Name: name,
	}

	job, err := client.RunJob(ctx, req)
	if err != nil {
		return fmt.Errorf("RunJob: %w", err)
	}

	fmt.Fprintf(w, "Ran job: %s\n", job.GetName())
	return nil
}

// [END cloudscheduler_v1beta1_cloudscheduler_run_job]
