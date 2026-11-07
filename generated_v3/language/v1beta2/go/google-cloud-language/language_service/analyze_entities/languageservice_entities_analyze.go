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

// [START language_v1beta2_languageservice_analyze_entities]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1beta2"
	languagepb "cloud.google.com/go/language/apiv1beta2/languagepb"
)

// analyzeEntities finds named entities in text using the Cloud Natural Language API.
func analyzeEntities(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Type: languagepb.Document_PLAIN_TEXT,
		Source: &languagepb.Document_Content{
			Content: "Google, headquartered in Mountain View, was founded by Larry Page and Sergey Brin.",
		},
	}
	encodingType := languagepb.EncodingType_UTF8

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.AnalyzeEntitiesRequest{
		Document:     document,
		EncodingType: encodingType,
	}

	resp, err := client.AnalyzeEntities(ctx, req)
	if err != nil {
		return fmt.Errorf("AnalyzeEntities failed: %w", err)
	}

	for _, entity := range resp.GetEntities() {
		fmt.Fprintf(w, "Entity: %s\n", entity.GetName())
		fmt.Fprintf(w, "Type: %s\n", entity.GetType())
		fmt.Fprintf(w, "Salience: %.2f\n", entity.GetSalience())
	}

	return nil
}

// [END language_v1beta2_languageservice_analyze_entities]
