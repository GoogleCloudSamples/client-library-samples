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

package snippets

// [START batch_v1_batchservice_jobs_list]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
	"google.golang.org/api/iterator"
)

// listJobs lists Batch jobs in a specified project and location.
func listJobs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("batch.NewClient: %w", err)
	}
	defer client.Close()

	req := &batchpb.ListJobsRequest{
		Parent: parent,
	}

	it := client.ListJobs(ctx, req)
	for {
		job, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListJobs iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Job: %s\n", job.GetName())
	}

	return nil
}

// [END batch_v1_batchservice_jobs_list]
