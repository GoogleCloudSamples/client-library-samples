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

// [START language_v1_languageservice_classify_text]

import (
	"context"
	"fmt"
	"io"

	language "cloud.google.com/go/language/apiv1"
	languagepb "cloud.google.com/go/language/apiv1/languagepb"
)

// classifyText analyzes text and returns content categories.
func classifyText(ctx context.Context, w io.Writer) error {
	document := &languagepb.Document{
		Source: &languagepb.Document_Content{
			Content: "Google Home enables users to speak voice commands to interact with services through the Google Assistant. Both in-house and third-party services are integrated, allowing users to listen to music, control playback of videos or photos, or receive news updates entirely by voice.",
		},
		Type: languagepb.Document_PLAIN_TEXT,
	}

	client, err := language.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &languagepb.ClassifyTextRequest{
		Document: document,
	}

	resp, err := client.ClassifyText(ctx, req)
	if err != nil {
		return fmt.Errorf("ClassifyText: %w", err)
	}

	for _, category := range resp.GetCategories() {
		fmt.Fprintf(w, "Category: %s, Confidence: %.2f\n", category.GetName(), category.GetConfidence())
	}

	return nil
}

// [END language_v1_languageservice_classify_text]
