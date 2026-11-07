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

// [START translate_v3_translationservice_dataset_get]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// getDataset retrieves metadata for an existing translation dataset.
func getDataset(ctx context.Context, w io.Writer, projectID string, locationID string, datasetID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/datasets/%s", projectID, locationID, datasetID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient failed: %w", err)
	}
	defer client.Close()

	req := &translatepb.GetDatasetRequest{
		Name: name,
	}

	dataset, err := client.GetDataset(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDataset failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved dataset: %s\n", dataset.GetName())
	fmt.Fprintf(w, "Display name: %s\n", dataset.GetDisplayName())
	fmt.Fprintf(w, "Source language code: %s\n", dataset.GetSourceLanguageCode())
	fmt.Fprintf(w, "Target language code: %s\n", dataset.GetTargetLanguageCode())

	return nil
}

// [END translate_v3_translationservice_dataset_get]
