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

// [START managedkafka_v1_managedschemaregistry_check_compatibility]

import (
	"context"
	"fmt"
	"io"

	schemaregistry "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	"cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// checkCompatibility checks whether a schema is compatible with existing schema versions in a subject.
func checkCompatibility(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string, subjectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s/compatibility/subjects/%s/versions", projectID, locationID, schemaRegistryID, subjectID)
	schema := `{"type":"record","name":"User","fields":[{"name":"name","type":"string"}]}`

	client, err := schemaregistry.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.CheckCompatibilityRequest{
		Name:   name,
		Schema: schema,
	}

	resp, err := client.CheckCompatibility(ctx, req)
	if err != nil {
		return fmt.Errorf("CheckCompatibility failed: %w", err)
	}

	fmt.Fprintf(w, "Is compatible: %t\n", resp.GetIsCompatible())
	return nil
}

// [END managedkafka_v1_managedschemaregistry_check_compatibility]
