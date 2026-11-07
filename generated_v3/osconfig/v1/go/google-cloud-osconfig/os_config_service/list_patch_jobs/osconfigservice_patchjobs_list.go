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

// [START osconfig_v1_osconfigservice_patchjobs_list]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1"
	osconfigpb "cloud.google.com/go/osconfig/apiv1/osconfigpb"
	"google.golang.org/api/iterator"
)

// listPatchJobs lists OS patch jobs in a project.
func listPatchJobs(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("osconfig.NewClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListPatchJobsRequest{
		Parent: parent,
	}

	it := client.ListPatchJobs(ctx, req)
	for {
		patchJob, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration error: %w", err)
		}
		fmt.Fprintf(w, "Patch job: %s (State: %s)\n", patchJob.GetName(), patchJob.GetState())
	}

	return nil
}

// [END osconfig_v1_osconfigservice_patchjobs_list]
