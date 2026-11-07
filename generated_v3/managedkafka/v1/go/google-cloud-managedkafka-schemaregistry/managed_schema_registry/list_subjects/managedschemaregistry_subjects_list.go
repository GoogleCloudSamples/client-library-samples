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

// [START managedkafka_v1_managedschemaregistry_subjects_list]

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/schemaregistry/apiv1"
	"cloud.google.com/go/managedkafka/schemaregistry/apiv1/schemaregistrypb"
)

// listSubjects lists the schema subjects registered in a schema registry instance.
func listSubjects(ctx context.Context, w io.Writer, projectID string, locationID string, schemaRegistryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/schemaRegistries/%s", projectID, locationID, schemaRegistryID)

	client, err := managedkafka.NewManagedSchemaRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedSchemaRegistryClient failed: %w", err)
	}
	defer client.Close()

	req := &schemaregistrypb.ListSubjectsRequest{
		Parent: parent,
	}

	resp, err := client.ListSubjects(ctx, req)
	if err != nil {
		return fmt.Errorf("ListSubjects failed: %w", err)
	}

	var subjects []string
	if err := json.Unmarshal(resp.GetData(), &subjects); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %w", err)
	}

	for _, subject := range subjects {
		fmt.Fprintf(w, "Subject: %s\n", subject)
	}

	return nil
}

// [END managedkafka_v1_managedschemaregistry_subjects_list]
