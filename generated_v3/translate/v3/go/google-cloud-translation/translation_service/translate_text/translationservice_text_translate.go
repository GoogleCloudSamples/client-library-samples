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

// [START translate_v3_translationservice_translate_text]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// Use the TranslateText method.
func translateText(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	contents := "Hello, world!"
	targetLanguageCode := "es"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient failed: %w", err)
	}
	defer client.Close()

	req := &translatepb.TranslateTextRequest{
		Parent:             parent,
		TargetLanguageCode: targetLanguageCode,
		Contents:           []string{contents},
	}

	resp, err := client.TranslateText(ctx, req)
	if err != nil {
		return fmt.Errorf("TranslateText failed: %w", err)
	}

	for _, translation := range resp.GetTranslations() {
		fmt.Fprintf(w, "Translated text: %s\n", translation.GetTranslatedText())
	}

	return nil
}

// [END translate_v3_translationservice_translate_text]
