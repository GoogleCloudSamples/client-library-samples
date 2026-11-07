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

// [START managedkafka_v1_managedschemaregistry_version_delete]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	"cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// deleteVersion deletes a specific schema version in a Managed Service for Apache Kafka schema registry.
func deleteVersion(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string, subjectID string, versionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s/subjects/%s/versions/%s", projectID, locationID, schemaRegistryID, subjectID, versionID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.DeleteVersionRequest{
		Name: name,
	}

	if _, err := client.DeleteVersion(ctx, req); err != nil {
		return fmt.Errorf("DeleteVersion failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted version: %s\n", name)
	return nil
}

// [END managedkafka_v1_managedschemaregistry_version_delete]
