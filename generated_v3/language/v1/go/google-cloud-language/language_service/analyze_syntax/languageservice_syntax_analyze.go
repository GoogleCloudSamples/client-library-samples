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

// [START language_v1_languageservice_analyze_syntax]

import (
	"context"
	"fmt"
	"io"
	"os"

	language "cloud.google.com/go/language/apiv1"
	"cloud.google.com/go/language/apiv1/languagepb"
	"google.golang.org/api/option"
)

// analyzeSyntax analyzes the syntactic structure of the input text document.
func analyzeSyntax(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled the new phone at the conference.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
	}

	var opts []option.ClientOption
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := language.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeSyntaxRequest{
		Document:     document,
		EncodingType: languagepb.EncodingType_UTF8,
	}

	resp, err := client.AnalyzeSyntax(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeSyntax: %w", err)
	}

	fmt.Fprintf(w, "Tokens found: %d\n", len(resp.GetTokens()))
	for _, token := range resp.GetTokens() {
		fmt.Fprintf(w, "%s: %s\n", token.GetPartOfSpeech().GetTag(), token.GetText().GetContent())
	}

	return nil
}

// [END language_v1_languageservice_analyze_syntax]
