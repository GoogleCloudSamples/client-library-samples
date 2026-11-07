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

// [START translate_v3_translationservice_glossaryentry_create]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// createGlossaryEntry adds a new entry to an existing glossary.
func createGlossaryEntry(ctx context.Context, w io.Writer, projectID string, locationID string, glossaryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/glossaries/%s", projectID, locationID, glossaryID)
	glossaryEntry := &translatepb.GlossaryEntry{
		Data: &translatepb.GlossaryEntry_TermsPair{
			TermsPair: &translatepb.GlossaryEntry_GlossaryTermsPair{
				SourceTerm: &translatepb.GlossaryTerm{
					LanguageCode: "en",
					Text:         "hello",
				},
				TargetTerm: &translatepb.GlossaryTerm{
					LanguageCode: "fr",
					Text:         "bonjour",
				},
			},
		},
		Description: "A bilingual glossary entry for greeting",
	}

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient: %w", err)
	}
	defer client.Close()

	req := &translatepb.CreateGlossaryEntryRequest{
		Parent:        parent,
		GlossaryEntry: glossaryEntry,
	}

	resp, err := client.CreateGlossaryEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGlossaryEntry: %w", err)
	}

	fmt.Fprintf(w, "Created glossary entry: %s\n", resp.GetName())
	return nil
}

// [END translate_v3_translationservice_glossaryentry_create]
