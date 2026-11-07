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

// [START translate_v3_translationservice_supportedlanguages_get]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// getSupportedLanguages lists the languages supported by Cloud Translation.
func getSupportedLanguages(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient: %w", err)
	}
	defer client.Close()

	req := &translatepb.GetSupportedLanguagesRequest{
		Parent:              parent,
		DisplayLanguageCode: "en",
	}

	resp, err := client.GetSupportedLanguages(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSupportedLanguages: %w", err)
	}

	for _, lang := range resp.GetLanguages() {
		fmt.Fprintf(w, "Language code: %s, Display name: %s\n", lang.GetLanguageCode(), lang.GetDisplayName())
	}

	return nil
}

// [END translate_v3_translationservice_supportedlanguages_get]
