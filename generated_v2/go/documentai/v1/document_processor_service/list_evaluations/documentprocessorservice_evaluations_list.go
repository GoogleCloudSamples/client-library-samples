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

// [START documentai_v1_documentprocessorservice_evaluations_list]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	documentaipb "cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listEvaluations lists evaluations for a Document AI processor version.
func listEvaluations(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string, processorVersionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/processors/%s/processorVersions/%s", projectID, locationID, processorID, processorVersionID)

	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentProcessorClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentProcessorClient failed: %w", err)
	}
	defer client.Close()

	req := &documentaipb.ListEvaluationsRequest{
		Parent: parent,
	}

	it := client.ListEvaluations(ctx, req)
	var count int
	for {
		evaluation, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Evaluation: %s\n", evaluation.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No evaluations found.")
	}

	return nil
}

// [END documentai_v1_documentprocessorservice_evaluations_list]
