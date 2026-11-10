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

// [START dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
	"google.golang.org/api/iterator"
)

// aggregatedListJobs lists Dataflow jobs across all regions for a project.
func aggregatedListJobs(ctx context.Context, w io.Writer, projectID string) error {
	client, err := dataflow.NewJobsV1Beta3Client(ctx)
	if err != nil {
		return fmt.Errorf("NewJobsV1Beta3Client: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.ListJobsRequest{
		ProjectId: projectID,
	}

	it := client.AggregatedListJobs(ctx, req)
	for {
		job, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}

		fmt.Fprintf(w, "Found job: %s (ID: %s, State: %s, Location: %s)\n",
			job.GetName(),
			job.GetId(),
			job.GetCurrentState(),
			job.GetLocation(),
		)
	}

	return nil
}

// [END dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]
