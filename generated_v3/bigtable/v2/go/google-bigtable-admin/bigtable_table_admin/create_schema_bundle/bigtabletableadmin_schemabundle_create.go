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

// [START bigtableadmin_v2_bigtabletableadmin_schemabundle_create]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// createSchemaBundle creates an Avro schema bundle for a Bigtable table.
func createSchemaBundle(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string, schemaBundleID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)
	schemaBundle := &adminpb.SchemaBundle{
		Type: &adminpb.SchemaBundle_AvroSchema{
			AvroSchema: &adminpb.AvroSchema{
				JsonSchemas: []string{
					`{"type":"record","name":"User","fields":[{"name":"id","type":"string"}]}`,
				},
			},
		},
	}

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateSchemaBundleRequest{
		Parent:         parent,
		SchemaBundleId: schemaBundleID,
		SchemaBundle:   schemaBundle,
	}

	op, err := client.CreateSchemaBundle(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSchemaBundle: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created schema bundle: %s\n", resp.GetName())

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_schemabundle_create]
