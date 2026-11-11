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

// [START parallelstore_v1beta_parallelstore_instances_list]

import (
	"context"
	"fmt"
	"io"

	parallelstore "cloud.google.com/go/parallelstore/apiv1beta"
	parallelstorepb "cloud.google.com/go/parallelstore/apiv1beta/parallelstorepb"
	"google.golang.org/api/iterator"
)

// listInstances retrieves a list of Parallelstore instances in the specified location.
func listInstances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := parallelstore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &parallelstorepb.ListInstancesRequest{
		Parent: parent,
	}

	it := client.ListInstances(ctx, req)
	var found bool
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListInstances failed: %w", err)
		}
		fmt.Fprintf(w, "Instance: %s\n", resp.GetName())
		found = true
	}
	if !found {
		fmt.Fprintf(w, "No instances found in %s\n", parent)
	}

	return nil
}

// [END parallelstore_v1beta_parallelstore_instances_list]
