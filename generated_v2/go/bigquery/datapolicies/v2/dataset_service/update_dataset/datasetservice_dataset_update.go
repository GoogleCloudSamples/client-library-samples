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

// [START analyticshub_v2_datasetservice_dataset_update]

import (
	"context"
	"fmt"
	"io"

	"google.golang.org/api/bigquery/v2"
)

// updateDataset updates properties of an existing BigQuery dataset.
func updateDataset(ctx context.Context, w io.Writer, datasetID string, projectID string) error {
	dataset := &bigquery.Dataset{
		Description: "Updated dataset description",
	}

	client, err := bigquery.NewService(ctx)
	if err != nil {
		return fmt.Errorf("bigquery.NewService: %w", err)
	}

	resp, err := client.Datasets.Update(projectID, datasetID, dataset).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("client.Datasets.Update: %w", err)
	}

	fmt.Fprintf(w, "Updated dataset: %s\n", resp.Id)
	return nil
}

// [END analyticshub_v2_datasetservice_dataset_update]
