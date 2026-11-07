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

// [START managedkafka_v1_managedschemaregistry_schemaregistries_list]

import (
	"context"
	"fmt"
	"io"

	schemaregistry "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	"cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// listSchemaRegistries lists schema registries in a given project and location.
func listSchemaRegistries(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := schemaregistry.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.ListSchemaRegistriesRequest{
		Parent: parent,
	}

	resp, err := client.ListSchemaRegistries(ctx, req)
	if err != nil {
		return fmt.Errorf("ListSchemaRegistries failed: %w", err)
	}

	for _, registry := range resp.GetSchemaRegistries() {
		fmt.Fprintf(w, "Got schema registry: %s\n", registry.GetName())
	}

	return nil
}

// [END managedkafka_v1_managedschemaregistry_schemaregistries_list]
