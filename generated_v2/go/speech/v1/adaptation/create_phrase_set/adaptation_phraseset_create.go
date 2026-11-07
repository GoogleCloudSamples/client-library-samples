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

// [START speech_v1_adaptation_phraseset_create]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1"
	"cloud.google.com/go/speech/apiv1/speechpb"
	"google.golang.org/api/option"
)

// createPhraseSet creates a new phrase set to adapt speech recognition.
func createPhraseSet(ctx context.Context, w io.Writer, projectID string, locationID string, phraseSetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	phraseSet := &speechpb.PhraseSet{
		Phrases: []*speechpb.PhraseSet_Phrase{
			{
				Value: "speech adaptation",
				Boost: 10.0,
			},
		},
	}

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewAdaptationClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAdaptationClient: %w", err)
	}
	defer client.Close()

	req := &speechpb.CreatePhraseSetRequest{
		Parent:      parent,
		PhraseSetId: phraseSetID,
		PhraseSet:   phraseSet,
	}

	resp, err := client.CreatePhraseSet(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePhraseSet: %w", err)
	}

	fmt.Fprintf(w, "Created phrase set: %s\n", resp.GetName())
	return nil
}

// [END speech_v1_adaptation_phraseset_create]
