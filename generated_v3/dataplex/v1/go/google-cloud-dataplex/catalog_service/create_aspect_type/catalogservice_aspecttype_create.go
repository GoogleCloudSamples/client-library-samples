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

// [START dataplex_v1_catalogservice_aspecttype_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// createAspectType creates an aspect type in Dataplex Catalog.
func createAspectType(ctx context.Context, w io.Writer, locationID string, aspectTypeID string, projectID string) error {
	aspectType := &dataplexpb.AspectType{
		DisplayName: "Example Aspect Type",
		Description: "Example Aspect Type Description",
		MetadataTemplate: &dataplexpb.AspectType_MetadataTemplate{
			Name: "example_aspect_type",
			Type: "record",
			RecordFields: []*dataplexpb.AspectType_MetadataTemplate{
				{
					Index: 1,
					Name:  "field1",
					Type:  "string",
				},
			},
		},
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateAspectTypeRequest{
		Parent:       parent,
		AspectTypeId: aspectTypeID,
		AspectType:   aspectType,
	}

	op, err := client.CreateAspectType(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAspectType failed: %w", err)
	}

	// CreateAspectType is a long-running operation; wait for it to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created aspect type: %s\n", resp.GetName())

	return nil
}

// [END dataplex_v1_catalogservice_aspecttype_create]
