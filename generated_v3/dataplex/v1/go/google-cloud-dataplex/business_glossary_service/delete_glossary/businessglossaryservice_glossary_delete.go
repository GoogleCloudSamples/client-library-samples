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

// [START dataplex_v1_businessglossaryservice_glossary_delete]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// deleteGlossary deletes an existing Dataplex glossary.
// Child categories and terms must be deleted before calling DeleteGlossary.
func deleteGlossary(ctx context.Context, w io.Writer, locationID string, glossaryID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/glossaries/%s", projectID, locationID, glossaryID)

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.DeleteGlossaryRequest{
		Name: name,
	}

	op, err := client.DeleteGlossary(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteGlossary failed: %w", err)
	}

	// DeleteGlossary is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted glossary: %s\n", name)

	return nil
}

// [END dataplex_v1_businessglossaryservice_glossary_delete]
