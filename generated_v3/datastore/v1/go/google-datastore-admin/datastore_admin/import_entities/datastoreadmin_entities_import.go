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

// [START datastore_v1_datastoreadmin_import_entities]

import (
	"context"
	"fmt"
	"io"

	datastore "cloud.google.com/go/datastore/admin/apiv1"
	adminpb "cloud.google.com/go/datastore/admin/apiv1/adminpb"
)

// importEntities imports entities into Datastore from Cloud Storage.
func importEntities(ctx context.Context, w io.Writer, projectID string, inputURL string) error {
	client, err := datastore.NewDatastoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDatastoreAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ImportEntitiesRequest{
		ProjectId: projectID,
		InputUrl:  inputURL,
	}

	op, err := client.ImportEntities(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportEntities: %w", err)
	}

	// Long-running operations require waiting until completion.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Entities imported successfully from %s\n", inputURL)
	return nil
}

// [END datastore_v1_datastoreadmin_import_entities]
