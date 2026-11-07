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

// [START cloudscheduler_v1beta1_cloudscheduler_jobs_list]

import (
	"context"
	"fmt"
	"io"

	cloudscheduler "cloud.google.com/go/scheduler/apiv1beta1"
	"cloud.google.com/go/scheduler/apiv1beta1/schedulerpb"
	"google.golang.org/api/iterator"
)

// listJobs retrieves and prints all Cloud Scheduler jobs in a specified project and location.
func listJobs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := cloudscheduler.NewCloudSchedulerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudSchedulerClient failed: %w", err)
	}
	defer client.Close()

	req := &schedulerpb.ListJobsRequest{
		Parent: parent,
	}

	it := client.ListJobs(ctx, req)
	for {
		job, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Job: %s\n", job.GetName())
	}

	return nil
}

// [END cloudscheduler_v1beta1_cloudscheduler_jobs_list]
