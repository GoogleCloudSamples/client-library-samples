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

// [START analyticshub_v2_datasetservice_undelete_dataset]

import (
	"context"
	"fmt"
	"io"

	"google.golang.org/api/bigquery/v2"
)

// undeleteDataset restores a deleted dataset in the specified project.
func undeleteDataset(ctx context.Context, w io.Writer, datasetID string, projectID string) error {
	service, err := bigquery.NewService(ctx)
	if err != nil {
		return fmt.Errorf("bigquery.NewService: %w", err)
	}

	req := &bigquery.UndeleteDatasetRequest{}
	dataset, err := service.Datasets.Undelete(projectID, datasetID, req).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("Datasets.Undelete: %w", err)
	}

	fmt.Fprintf(w, "Dataset undeleted successfully: %v\n", dataset.Id)
	return nil
}

// [END analyticshub_v2_datasetservice_undelete_dataset]
