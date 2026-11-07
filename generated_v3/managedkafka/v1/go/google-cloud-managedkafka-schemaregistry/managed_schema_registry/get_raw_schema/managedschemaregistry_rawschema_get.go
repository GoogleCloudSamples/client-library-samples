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

// [START managedkafka_v1_managedschemaregistry_rawschema_get]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	schemaregistrypb "cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// getRawSchema gets the raw schema content from a Schema Registry instance.
func getRawSchema(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string, schemaID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s/schemas/ids/%s", projectID, locationID, schemaRegistryID, schemaID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.GetSchemaRequest{
		Name: name,
	}

	response, err := client.GetRawSchema(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetRawSchema failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved raw schema: %s\n", string(response.GetData()))
	return nil
}

// [END managedkafka_v1_managedschemaregistry_rawschema_get]
