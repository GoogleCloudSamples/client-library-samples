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

// [START translate_v3_translationservice_examples_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
	"google.golang.org/api/iterator"
)

// listExamples lists translation examples stored in a dataset.
func listExamples(ctx context.Context, w io.Writer, projectID string, locationID string, datasetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/datasets/%s", projectID, locationID, datasetID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient failed: %w", err)
	}
	defer client.Close()

	req := &translatepb.ListExamplesRequest{
		Parent: parent,
	}

	it := client.ListExamples(ctx, req)
	var count int
	for {
		example, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListExamples iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Example: %s\n", example.GetName())
		fmt.Fprintf(w, "  Source text: %s\n", example.GetSourceText())
		fmt.Fprintf(w, "  Target text: %s\n", example.GetTargetText())
	}
	if count == 0 {
		fmt.Fprintln(w, "No examples found.")
	}

	return nil
}

// [END translate_v3_translationservice_examples_list]
