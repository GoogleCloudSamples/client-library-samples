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

// [START translate_v3_translationservice_glossaryentry_delete]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// deleteGlossaryEntry deletes a specific glossary entry from an existing glossary.
func deleteGlossaryEntry(ctx context.Context, w io.Writer, projectID string, locationID string, glossaryID string, glossaryEntryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/glossaries/%s/glossaryEntries/%s", projectID, locationID, glossaryID, glossaryEntryID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient: %w", err)
	}
	defer client.Close()

	req := &translatepb.DeleteGlossaryEntryRequest{
		Name: name,
	}

	if err := client.DeleteGlossaryEntry(ctx, req); err != nil {
		return fmt.Errorf("DeleteGlossaryEntry: %w", err)
	}

	fmt.Fprintf(w, "Deleted glossary entry: %s\n", name)

	return nil
}

// [END translate_v3_translationservice_glossaryentry_delete]
