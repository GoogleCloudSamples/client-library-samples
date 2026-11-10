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

// [START managedkafka_v1_managedschemaregistry_schematypes_list]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	schemaregistrypb "cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// listSchemaTypes lists the schema types supported by the schema registry.
func listSchemaTypes(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s", projectID, locationID, schemaRegistryID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.ListSchemaTypesRequest{
		Parent: parent,
	}

	resp, err := client.ListSchemaTypes(ctx, req)
	if err != nil {
		return fmt.Errorf("ListSchemaTypes failed: %w", err)
	}

	fmt.Fprintf(w, "Schema types: %s\n", string(resp.GetData()))

	return nil
}

// [END managedkafka_v1_managedschemaregistry_schematypes_list]
