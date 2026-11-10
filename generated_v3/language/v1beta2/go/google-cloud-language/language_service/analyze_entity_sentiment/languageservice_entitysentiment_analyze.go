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

// [START language_v1beta2_languageservice_analyze_entity_sentiment]

import (
	"context"
	"fmt"
	"io"
	"os"

	language "cloud.google.com/go/language/apiv1beta2"
	languagepb "cloud.google.com/go/language/apiv1beta2/languagepb"
	"google.golang.org/api/option"
)

// analyzeEntitySentiment analyzes the sentiment associated with entities in text.
func analyzeEntitySentiment(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Type: languagepb.Document_PLAIN_TEXT,
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled positive quarterly earnings.",
		},
	}

	var opts []option.ClientOption
	for _, env := range []string{"GOOGLE_CLOUD_PROJECT", "GCLOUD_PROJECT", "GCP_PROJECT", "PROJECT_ID"} {
		if projectID := os.Getenv(env); projectID != "" {
			opts = append(opts, option.WithQuotaProject(projectID))
			break
		}
	}

	client, err := language.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeEntitySentimentRequest{
		Document:     document,
		EncodingType: languagepb.EncodingType_UTF8,
	}

	resp, err := client.AnalyzeEntitySentiment(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeEntitySentiment: %w", err)
	}

	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "Entity: %s\n", entity.GetName())
		fmt.Fprintf(w, "Type: %s\n", entity.GetType())
		fmt.Fprintf(w, "Salience: %.2f\n", entity.GetSalience())
		if sentiment := entity.GetSentiment(); sentiment != nil {
			fmt.Fprintf(w, "Sentiment Score: %.2f\n", sentiment.GetScore())
			fmt.Fprintf(w, "Sentiment Magnitude: %.2f\n", sentiment.GetMagnitude())
		}
	}

	return nil
}

// [END language_v1beta2_languageservice_analyze_entity_sentiment]
