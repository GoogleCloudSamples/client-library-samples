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

// [START biglake_v1alpha1_metastoreservice_database_update]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	biglakepb "cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateDatabase method.
func updateDatabase(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string, projectID string) error {
	database := &biglakepb.Database{
		Name: fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s", projectID, locationID, catalogID, databaseID),
		Type: biglakepb.Database_HIVE,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"type"},
	}

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.UpdateDatabaseRequest{
		Database:   database,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateDatabase(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDatabase failed: %w", err)
	}

	fmt.Fprintf(w, "Updated database: %s\n", resp.GetName())
	return nil
}

// [END biglake_v1alpha1_metastoreservice_database_update]
