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

// [START dataplex_v1_businessglossaryservice_glossarycategory_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// createGlossaryCategory creates a category within a Dataplex glossary.
func createGlossaryCategory(ctx context.Context, w io.Writer, locationID string, glossaryID string, categoryID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/glossaries/%s", projectID, locationID, glossaryID)
	category := &dataplexpb.GlossaryCategory{
		Parent:      parent,
		DisplayName: "Example Category",
		Description: "Example description for the glossary category.",
	}

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateGlossaryCategoryRequest{
		Parent:     parent,
		CategoryId: categoryID,
		Category:   category,
	}

	resp, err := client.CreateGlossaryCategory(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGlossaryCategory failed: %w", err)
	}

	fmt.Fprintf(w, "Created glossary category: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_businessglossaryservice_glossarycategory_create]
