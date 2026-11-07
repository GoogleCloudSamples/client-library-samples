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

// [START speech_v2_speech_phraseset_update]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updatePhraseSet updates an existing phrase set.
func updatePhraseSet(ctx context.Context, w io.Writer, projectID string, locationID string, phraseSetID string) error {
	phraseSet := &speechpb.PhraseSet{
		Name: fmt.Sprintf("projects/%s/locations/%s/phraseSets/%s", projectID, locationID, phraseSetID),
		Phrases: []*speechpb.PhraseSet_Phrase{
			{
				Value: "hello",
				Boost: 10,
			},
		},
	}

	endpoint := "speech.googleapis.com:443"
	if locationID != "global" {
		endpoint = fmt.Sprintf("%s-speech.googleapis.com:443", locationID)
	}

	client, err := speech.NewClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.UpdatePhraseSetRequest{
		PhraseSet: phraseSet,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"phrases"},
		},
	}

	op, err := client.UpdatePhraseSet(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePhraseSet failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated phrase set: %s\n", resp.GetName())

	return nil
}

// [END speech_v2_speech_phraseset_update]
