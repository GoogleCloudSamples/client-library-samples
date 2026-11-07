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

// [START language_v1beta2_languageservice_annotate_text]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1beta2"
	"cloud.google.com/go/language/apiv1beta2/languagepb"
)

// annotateText analyzes text syntax, entities, and document sentiment.
func annotateText(ctx context.Context, w io.Writer) error {
	features := &languagepb.AnnotateTextRequest_Features{
		ExtractSyntax:            true,
		ExtractEntities:          true,
		ExtractDocumentSentiment: true,
	}
	document := &languagepb.Document{
		Type: languagepb.Document_PLAIN_TEXT,
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled new features.",
		},
	}

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnnotateTextRequest{
		Document:     document,
		Features:     features,
		EncodingType: languagepb.EncodingType_UTF8,
	}

	resp, err := client.AnnotateText(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateText: %w", err)
	}

	fmt.Fprintf(w, "Document sentiment score: %.2f\n", resp.GetDocumentSentiment().GetScore())
	fmt.Fprintf(w, "Entity count: %d\n", len(resp.GetEntities()))
	fmt.Fprintf(w, "Sentence count: %d\n", len(resp.GetSentences()))

	return nil
}

// [END language_v1beta2_languageservice_annotate_text]
