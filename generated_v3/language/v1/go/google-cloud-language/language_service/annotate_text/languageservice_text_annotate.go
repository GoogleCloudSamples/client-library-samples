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

// [START language_v1_languageservice_annotate_text]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1"
	"cloud.google.com/go/language/apiv1/languagepb"
)

// annotateText analyzes syntax, entities, and document sentiment in a text string.
func annotateText(ctx context.Context, w io.Writer) error {
	features := &languagepb.AnnotateTextRequest_Features{
		ExtractSyntax:            true,
		ExtractEntities:          true,
		ExtractDocumentSentiment: true,
	}
	document := &languagepb.Document{
		Type: languagepb.Document_PLAIN_TEXT,
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronic Show. Sundar Pichai said in his keynote that users would love their new experience.",
		},
	}
	encodingType := languagepb.EncodingType_UTF8

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnnotateTextRequest{
		Document:     document,
		Features:     features,
		EncodingType: encodingType,
	}

	resp, err := client.AnnotateText(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateText failed: %w", err)
	}

	fmt.Fprintf(w, "Detected language: %s\n", resp.GetLanguage())
	fmt.Fprintf(w, "Document sentiment score: %.2f, magnitude: %.2f\n",
		resp.GetDocumentSentiment().GetScore(),
		resp.GetDocumentSentiment().GetMagnitude(),
	)

	fmt.Fprintf(w, "Entities found: %d\n", len(resp.GetEntities()))
	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "  Entity: %s (Type: %s, Salience: %.2f)\n",
			entity.GetName(),
			entity.GetType(),
			entity.GetSalience(),
		)
	}

	fmt.Fprintf(w, "Sentences found: %d\n", len(resp.GetSentences()))
	for _, sentence := range resp.GetSentences() {
		fmt.Fprintf(w, "  Sentence: %q\n", sentence.GetText().GetContent())
	}

	return nil
}

// [END language_v1_languageservice_annotate_text]
