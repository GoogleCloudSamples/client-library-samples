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

// [START apphub_v1_apphub_workloads_list]

import (
	"context"
	"fmt"
	"io"

	apphub "cloud.google.com/go/apphub/apiv1"
	apphubpb "cloud.google.com/go/apphub/apiv1/apphubpb"
	"google.golang.org/api/iterator"
)

// listWorkloads lists all workloads registered to an App Hub application.
func listWorkloads(ctx context.Context, w io.Writer, projectID string, locationID string, applicationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/applications/%s", projectID, locationID, applicationID)

	client, err := apphub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apphubpb.ListWorkloadsRequest{
		Parent: parent,
	}

	it := client.ListWorkloads(ctx, req)
	count := 0
	for {
		workload, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListWorkloads: %w", err)
		}
		fmt.Fprintf(w, "Workload: %s\n", workload.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No workloads found.")
	}

	return nil
}

// [END apphub_v1_apphub_workloads_list]
