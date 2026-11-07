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

// [START dataplex_v1_businessglossaryservice_glossary_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// Use the CreateGlossary method.
func createGlossary(ctx context.Context, w io.Writer, locationID string, glossaryID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	glossary := &dataplexpb.Glossary{
		DisplayName: "Example Glossary",
		Description: "Glossary for managing business terms.",
	}

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateGlossaryRequest{
		Parent:     parent,
		GlossaryId: glossaryID,
		Glossary:   glossary,
	}

	op, err := client.CreateGlossary(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGlossary failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for CreateGlossary operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created glossary: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_businessglossaryservice_glossary_create]
