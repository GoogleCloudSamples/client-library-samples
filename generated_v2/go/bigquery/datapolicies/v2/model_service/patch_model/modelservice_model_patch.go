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

// [START analyticshub_v2_modelservice_model_patch]

import (
	"context"
	"fmt"
	"io"

	"google.golang.org/api/bigquery/v2"
)

// patchModel updates the metadata of an existing BigQuery model.
func patchModel(ctx context.Context, w io.Writer, projectID string, datasetID string, modelID string) error {
	model := &bigquery.Model{
		Description: "Updated model description",
	}

	service, err := bigquery.NewService(ctx)
	if err != nil {
		return fmt.Errorf("bigquery.NewService failed: %w", err)
	}

	resp, err := service.Models.Patch(projectID, datasetID, modelID, model).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("Models.Patch failed: %w", err)
	}

	fmt.Fprintf(w, "Updated model: %s\n", resp.Description)
	return nil
}

// [END analyticshub_v2_modelservice_model_patch]
