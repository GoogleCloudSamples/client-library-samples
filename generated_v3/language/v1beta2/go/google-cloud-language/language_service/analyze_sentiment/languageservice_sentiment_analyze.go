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

// [START language_v1beta2_languageservice_analyze_sentiment]

import (
	"context"
	"fmt"
	"io"
	"os"

	language "cloud.google.com/go/language/apiv1beta2"
	"cloud.google.com/go/language/apiv1beta2/languagepb"
	"google.golang.org/api/option"
)

// analyzeSentiment analyzes the sentiment of the provided text.
func analyzeSentiment(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Type: languagepb.Document_PLAIN_TEXT,
		Source: &languagepb.Document_Content{
			Content: "Google Cloud Natural Language API provides text analysis.",
		},
	}

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := language.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("language.NewClient: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeSentimentRequest{
		Document:     document,
		EncodingType: languagepb.EncodingType_UTF8,
	}

	resp, err := client.AnalyzeSentiment(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeSentiment: %w", err)
	}

	fmt.Fprintf(w, "Document sentiment score: %.2f\n", resp.GetDocumentSentiment().GetScore())
	fmt.Fprintf(w, "Document sentiment magnitude: %.2f\n", resp.GetDocumentSentiment().GetMagnitude())

	return nil
}

// [END language_v1beta2_languageservice_analyze_sentiment]
