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

// [START translate_v3_translationservice_romanize_text]

import (
	"context"
	"fmt"
	"io"

	translate "cloud.google.com/go/translate/apiv3"
	translatepb "cloud.google.com/go/translate/apiv3/translatepb"
)

// romanizeText transcribes text written in non-Latin scripts into the Roman alphabet.
func romanizeText(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	if locationID == "" {
		locationID = "global"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	contents := "こんにちは"

	client, err := translate.NewTranslationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTranslationClient failed: %w", err)
	}
	defer client.Close()

	req := &translatepb.RomanizeTextRequest{
		Parent:   parent,
		Contents: []string{contents},
	}

	resp, err := client.RomanizeText(ctx, req)
	if err != nil {
		return fmt.Errorf("RomanizeText failed: %w", err)
	}

	for _, romanization := range resp.GetRomanizations() {
		fmt.Fprintf(w, "Romanized text: %s\n", romanization.GetRomanizedText())
	}

	return nil
}

// [END translate_v3_translationservice_romanize_text]
