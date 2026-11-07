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

// [START language_v2_languageservice_annotate_text]

import (
	"context"
	"fmt"
	"io"
	"os"

	language "cloud.google.com/go/language/apiv2"
	"cloud.google.com/go/language/apiv2/languagepb"
	"google.golang.org/api/option"
)

// annotateText analyzes the sentiment and entities of a text document.
func annotateText(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronics Show.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
	}
	features := &languagepb.AnnotateTextRequest_Features{
		ExtractEntities:          true,
		ExtractDocumentSentiment: true,
	}

	var opts []option.ClientOption
	if quotaProject := os.Getenv("GOOGLE_CLOUD_QUOTA_PROJECT"); quotaProject != "" {
		opts = append(opts, option.WithQuotaProject(quotaProject))
	} else if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := language.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnnotateTextRequest{
		Document: document,
		Features: features,
	}

	resp, err := client.AnnotateText(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateText: %w", err)
	}

	fmt.Fprintf(w, "Language: %s\n", resp.GetLanguageCode())
	if sentiment := resp.GetDocumentSentiment(); sentiment != nil {
		fmt.Fprintf(w, "Sentiment score: %.2f, magnitude: %.2f\n", sentiment.GetScore(), sentiment.GetMagnitude())
	}
	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "Entity: %s (%s)\n", entity.GetName(), entity.GetType())
	}

	return nil
}

// [END language_v2_languageservice_annotate_text]
