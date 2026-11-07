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

// [START language_v1_languageservice_analyze_entity_sentiment]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1"
	"cloud.google.com/go/language/apiv1/languagepb"
)

// analyzeEntitySentiment analyzes sentiment associated with named entities in text.
func analyzeEntitySentiment(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled the new phone. Customers love the sleek design, but critics hate the high price.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
	}
	encodingType := languagepb.EncodingType_UTF8

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeEntitySentimentRequest{
		Document:     document,
		EncodingType: encodingType,
	}

	resp, err := client.AnalyzeEntitySentiment(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeEntitySentiment: %w", err)
	}

	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "Entity: %s\n", entity.GetName())
		fmt.Fprintf(w, "Type: %s\n", entity.GetType())
		if sentiment := entity.GetSentiment(); sentiment != nil {
			fmt.Fprintf(w, "Sentiment score: %.2f, magnitude: %.2f\n", sentiment.GetScore(), sentiment.GetMagnitude())
		}
		for _, mention := range entity.GetMentions() {
			if mentionSentiment := mention.GetSentiment(); mentionSentiment != nil {
				fmt.Fprintf(w, "  Mention: %s (score: %.2f, magnitude: %.2f)\n",
					mention.GetText().GetContent(),
					mentionSentiment.GetScore(),
					mentionSentiment.GetMagnitude())
			}
		}
	}

	return nil
}

// [END language_v1_languageservice_analyze_entity_sentiment]
