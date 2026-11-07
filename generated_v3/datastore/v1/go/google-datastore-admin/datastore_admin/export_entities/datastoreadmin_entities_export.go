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

// [START datastore_v1_datastoreadmin_export_entities]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/datastore/admin/apiv1"
	"cloud.google.com/go/datastore/admin/apiv1/adminpb"
)

// exportEntities exports entities from a Datastore project to Cloud Storage.
func exportEntities(ctx context.Context, w io.Writer, projectID string, outputURLPrefix string) error {
	client, err := admin.NewDatastoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDatastoreAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ExportEntitiesRequest{
		ProjectId:       projectID,
		OutputUrlPrefix: outputURLPrefix,
	}

	op, err := client.ExportEntities(ctx, req)
	if err != nil {
		return fmt.Errorf("ExportEntities: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Export completed successfully: %s\n", resp.GetOutputUrl())
	return nil
}

// [END datastore_v1_datastoreadmin_export_entities]
