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

// [START language_v1_languageservice_analyze_entities]

import (
	"context"
	"fmt"
	"io"
	"os"

	language "cloud.google.com/go/language/apiv1"
	"cloud.google.com/go/language/apiv1/languagepb"
	"google.golang.org/api/option"
)

// analyzeEntities analyzes entities within the provided text.
func analyzeEntities(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, unveiled new AI models.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
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

	req := &languagepb.AnalyzeEntitiesRequest{
		Document:     document,
		EncodingType: languagepb.EncodingType_UTF8,
	}

	resp, err := client.AnalyzeEntities(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeEntities: %w", err)
	}

	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "Entity: %s, Type: %s\n", entity.GetName(), entity.GetType())
	}

	return nil
}

// [END language_v1_languageservice_analyze_entities]
