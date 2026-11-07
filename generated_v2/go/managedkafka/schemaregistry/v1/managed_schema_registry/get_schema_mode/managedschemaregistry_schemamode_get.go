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

// [START managedkafka_v1_managedschemaregistry_schemamode_get]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	"cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// getSchemaMode retrieves the schema mode for a subject in a schema registry.
func getSchemaMode(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string, subjectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s/mode/%s", projectID, locationID, schemaRegistryID, subjectID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.GetSchemaModeRequest{
		Name: name,
	}

	response, err := client.GetSchemaMode(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSchemaMode failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved schema mode: %s\n", response.GetMode())
	return nil
}

// [END managedkafka_v1_managedschemaregistry_schemamode_get]
