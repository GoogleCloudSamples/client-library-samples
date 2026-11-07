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

// [START geminidataanalytics_v1_dataagentservice_accessibledataagents_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	geminidataanalytics "cloud.google.com/go/geminidataanalytics/apiv1beta"
	"cloud.google.com/go/geminidataanalytics/apiv1beta/geminidataanalyticspb"
	"google.golang.org/api/iterator"
)

// Use the ListAccessibleDataAgents method.
func listAccessibleDataAgents(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := geminidataanalytics.NewDataAgentClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataAgentClient failed: %w", err)
	}
	defer client.Close()

	req := &geminidataanalyticspb.ListAccessibleDataAgentsRequest{
		Parent: parent,
	}

	it := client.ListAccessibleDataAgents(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate accessible data agents: %w", err)
		}
		fmt.Fprintf(w, "Accessible data agent: %s\n", resp.GetName())
	}

	return nil
}

// [END geminidataanalytics_v1_dataagentservice_accessibledataagents_list]
