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

// [START firestore-metadata_v2beta_functionservice_runtimes_list]

import (
	"context"
	"fmt"
	"io"

	functions "cloud.google.com/go/functions/apiv2beta"
	functionspb "cloud.google.com/go/functions/apiv2beta/functionspb"
)

// listRuntimes lists the available Cloud Functions runtimes for a project and location.
func listRuntimes(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := functions.NewFunctionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFunctionClient failed: %w", err)
	}
	defer client.Close()

	req := &functionspb.ListRuntimesRequest{
		Parent: parent,
	}

	resp, err := client.ListRuntimes(ctx, req)
	if err != nil {
		return fmt.Errorf("ListRuntimes failed: %w", err)
	}

	for _, runtime := range resp.GetRuntimes() {
		fmt.Fprintf(w, "Runtime: %s (%s)\n", runtime.GetDisplayName(), runtime.GetName())
	}

	return nil
}

// [END firestore-metadata_v2beta_functionservice_runtimes_list]
