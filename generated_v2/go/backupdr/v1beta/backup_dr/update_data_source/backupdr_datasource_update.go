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

// [START backupdr_v1beta_backupdr_datasource_update]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDataSource updates the labels of a Backup and DR data source.
func updateDataSource(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string, dataSourceID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}
	dataSource := &backupdrpb.DataSource{
		Name: fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s/dataSources/%s", projectID, locationID, backupVaultID, dataSourceID),
		Labels: map[string]string{
			"env": "prod",
		},
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.UpdateDataSourceRequest{
		UpdateMask: updateMask,
		DataSource: dataSource,
	}

	op, err := client.UpdateDataSource(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDataSource failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated data source: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_datasource_update]
