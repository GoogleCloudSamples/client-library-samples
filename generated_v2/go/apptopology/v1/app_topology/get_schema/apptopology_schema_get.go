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

// [START apptopology_v1_apptopology_schema_get]

import (
	"context"
	"fmt"
	"io"

	apptopology "cloud.google.com/go/apptopology/apiv1"
	"cloud.google.com/go/apptopology/apiv1/apptopologypb"
)

// Use the GetSchema method.
func getSchema(ctx context.Context, w io.Writer, projectID string, locationID string, domainID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/domains/%s/schema", projectID, locationID, domainID)

	client, err := apptopology.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apptopologypb.GetSchemaRequest{
		Name: name,
	}

	resp, err := client.GetSchema(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSchema failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved schema: %s\n", resp.GetName())
	return nil
}

// [END apptopology_v1_apptopology_schema_get]
