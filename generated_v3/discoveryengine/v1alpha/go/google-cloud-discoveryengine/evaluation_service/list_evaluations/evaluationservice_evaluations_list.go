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

// [START discoveryengine_v1alpha_evaluationservice_evaluations_list]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/api/iterator"
)

// listEvaluations lists evaluations in the specified location.
func listEvaluations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := discoveryengine.NewEvaluationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewEvaluationClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ListEvaluationsRequest{
		Parent: parent,
	}

	it := client.ListEvaluations(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListEvaluations failed: %w", err)
		}
		fmt.Fprintf(w, "Evaluation: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintf(w, "No evaluations found in %s\n", parent)
	}

	return nil
}

// [END discoveryengine_v1alpha_evaluationservice_evaluations_list]
