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

// [START language_v2_languageservice_analyze_sentiment]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv2"
	languagepb "cloud.google.com/go/language/apiv2/languagepb"
)

// analyzeSentiment analyzes sentiment in a document using the Natural Language API.
func analyzeSentiment(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google Cloud Natural Language API provides powerful text analysis.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
	}

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeSentimentRequest{
		Document: document,
	}

	resp, err := client.AnalyzeSentiment(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeSentiment: %w", err)
	}

	sentiment := resp.GetDocumentSentiment()
	fmt.Fprintf(w, "Document sentiment score: %.2f\n", sentiment.GetScore())
	fmt.Fprintf(w, "Document sentiment magnitude: %.2f\n", sentiment.GetMagnitude())
	fmt.Fprintf(w, "Language: %s\n", resp.GetLanguageCode())

	return nil
}

// [END language_v2_languageservice_analyze_sentiment]
