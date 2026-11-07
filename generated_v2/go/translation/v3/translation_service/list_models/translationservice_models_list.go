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

// [START translate_v3_translationservice_models_list]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	"cloud.google.com/go/translate/apiv3/translatepb"
	"google.golang.org/api/iterator"
)

// listModels lists existing translation models in a given project and location.
func listModels(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient: %w", err)
	}
	defer client.Close()

	req := &translatepb.ListModelsRequest{
		Parent: parent,
	}

	it := client.ListModels(ctx, req)
	var count int
	for {
		model, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		count++
		fmt.Fprintf(w, "Model name: %s\n", model.GetName())
		fmt.Fprintf(w, "Display name: %s\n", model.GetDisplayName())
	}

	if count == 0 {
		fmt.Fprintln(w, "No models found.")
	}

	return nil
}

// [END translate_v3_translationservice_models_list]
