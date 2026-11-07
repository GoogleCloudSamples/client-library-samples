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

// [START managedkafka_v1_managedschemaregistry_schemaversions_list]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	managedkafkapb "cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// listSchemaVersions lists schema versions for a specified schema.
func listSchemaVersions(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string, schemaID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s/schemas/ids/%s", projectID, locationID, schemaRegistryID, schemaID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.ListSchemaVersionsRequest{
		Parent: parent,
	}

	resp, err := client.ListSchemaVersions(ctx, req)
	if err != nil {
		return fmt.Errorf("client.ListSchemaVersions failed: %w", err)
	}

	fmt.Fprintf(w, "Schema versions: %s\n", string(resp.GetData()))

	return nil
}

// [END managedkafka_v1_managedschemaregistry_schemaversions_list]
