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

// [START tpu_v1_tpu_nodes_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	tpu "cloud.google.com/go/tpu/apiv1"
	tpupb "cloud.google.com/go/tpu/apiv1/tpupb"
	"google.golang.org/api/iterator"
)

// listNodes retrieves a list of TPU nodes in the specified project and location.
func listNodes(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := tpu.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &tpupb.ListNodesRequest{
		Parent: parent,
	}

	it := client.ListNodes(ctx, req)
	var found bool
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve node: %w", err)
		}
		fmt.Fprintf(w, "Node: %s, State: %s\n", resp.GetName(), resp.GetState())
		found = true
	}
	if !found {
		fmt.Fprintln(w, "No TPU nodes found.")
	}

	return nil
}

// [END tpu_v1_tpu_nodes_list]
